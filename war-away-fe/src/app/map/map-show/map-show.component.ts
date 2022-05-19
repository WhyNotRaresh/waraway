import {Component, ElementRef, Injectable, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IOffer} from "../../model/offer";
import {OfferService} from "../../service/offer.service";
import {HttpResponse} from "@angular/common/http";
import {IFilter} from "../../model/filter";
import CSVLayer from "@arcgis/core/layers/CSVLayer";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import {INotifiable, Observer} from "../../service/observer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-map-show',
  templateUrl: './map-show.component.html',
  styleUrls: ['./map-show.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapShowComponent implements OnInit, INotifiable {

  offers: IOffer[] | undefined = undefined;
  filteredOffers: IOffer[] | undefined = undefined;

  _map : Map = new Map({
    basemap: "arcgis-navigation"
  });

  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef | undefined;

  constructor(public offerService: OfferService,
              private observer: Observer,
              public router: Router) {
    esriConfig.apiKey = "AAPK32e6d43055034688b9c4ea0e99730538UfAT0WFZa5p6IXz7mwwzsgy1ltMI9I4UVdqz6o-XYKSRchJLwhecU_2JMfEb1ICk";
    observer.subscribe(this);
  }

  ngOnInit(): void {
    this.offerService.getAllOffers().subscribe(
      (data: HttpResponse<IOffer[]>) => {
        this.offers = data.body ? data.body :  undefined;
        this.filteredOffers = this.offers;
        this.mapView()}
    );
  }

  mapView() {
    this._map.addMany(this.createCsvLayers());

    const view = new MapView({
      container: "viewDiv",
      map: this._map,
      center: [26.50, 46.64],
      zoom: 5
    });

    const search = new Search({
      view: view,
      container: "searchDiv",
    });


  }

  createCsvLayers(){
    let csvSrc = `latitude|longitude|departure-point|arrival-point|departure-date|description|pets|phone-number|person-number|distance`

    let csvDest = `latitude|longitude|departure-point|arrival-point|departure-date|description|pets|phone-number|person-number|distance`

    if (this.filteredOffers) {
      for (let i = 0; i < this.filteredOffers?.length; i++) {
        csvSrc += `\n`;
        csvSrc += (this.filteredOffers[i].originLat + `|` + this.filteredOffers[i].originLong + `|`
          + this.filteredOffers[i].departurePoint + `|` + this.filteredOffers[i].arrivalPoint + `|`
          + this.filteredOffers[i].departureDate + `|` + this.filteredOffers[i].description + '|'
          + (this.filteredOffers[i].pets ? 'Yes' : 'No') + `|` + this.filteredOffers[i].phoneNumber + '|'
          + this.filteredOffers[i].personNumber + `|` + this.filteredOffers[i].distance)

        csvDest += `\n`;
        csvDest += (this.filteredOffers[i].destLat + `|` + this.filteredOffers[i].destLong + `|`
          + this.filteredOffers[i].departurePoint + `|` + this.filteredOffers[i].arrivalPoint + `|`
          + this.filteredOffers[i].departureDate + `|` + this.filteredOffers[i].description + '|'
          + (this.filteredOffers[i].pets ? 'Yes' : 'No') + `|` + this.filteredOffers[i].phoneNumber + '|'
          + this.filteredOffers[i].personNumber + `|` + this.filteredOffers[i].distance)

      }
    }

    const popupTemplate = {
      title: "Ride Info",
      content: "<br>From: {departure-point}" +
        "<br>To: {arrival-point}" +
        "<br>Departure Date: {departure-date}" +
        "<br>Distance: {distance} km" +
        "<br>Phone Number: {phone-number}" +
        "<br>Number Seats: {person-number}    Pets allowed: {pets}" +
        "<br>Details: {description}"
    };

    // SOURCE
    const srcRenderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        size: 10,
        color: "green"
      })
    });

    const destRenderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        size: 10,
        color: "red"
      })
    });

    const srcBlob = new Blob([csvSrc], {type: "plain/text"})
    const srcUrl = URL.createObjectURL(srcBlob);

    const destBlob = new Blob([csvDest], {type: "plain/text"})
    const destUrl = URL.createObjectURL(destBlob);

    const srcCsvLayer = new CSVLayer({
      popupTemplate: popupTemplate,
      renderer: srcRenderer,
      url: srcUrl
    });

    const destCsvLayer = new CSVLayer({
      popupTemplate: popupTemplate,
      renderer: destRenderer,
      url: destUrl
    });

    return [srcCsvLayer, destCsvLayer];
  }

  refreshMapLayers(){
    this._map.removeAll();
    this._map.addMany(this.createCsvLayers());
  }

  notify(data: any) {
    this.filterOffers(data as IFilter);
  }

  filterOffers(filter: IFilter) {
    this.filteredOffers = this.offers?.filter(
      (x) => {
        if(filter.date)
          if(x.departureDate != filter.date)
            return false;
        if(filter.personNumber)
          if(x.personNumber < filter.personNumber)
            return false;
        if(filter.pets)
          if(!x.pets)
            return false;

        return true;
      }
    )
    this.refreshMapLayers();
  }
}
