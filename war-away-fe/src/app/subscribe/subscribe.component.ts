import { Component, OnInit } from '@angular/core';
import {ISubscribe} from "../model/subscribe";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import {SubscribeService} from "../service/subscribe.service";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  public subscribe: ISubscribe = {
    id: 0,
    email: '',
    location: '',
    type: ''
  };

  _map : Map = new Map({
    basemap: "arcgis-navigation"
  });

  constructor(private subscrieService: SubscribeService) {
    esriConfig.apiKey = "AAPK32e6d43055034688b9c4ea0e99730538UfAT0WFZa5p6IXz7mwwzsgy1ltMI9I4UVdqz6o-XYKSRchJLwhecU_2JMfEb1ICk";
  }

  ngOnInit(): void {
    this.mapView();
  }

  mapView() {
    const view = new MapView({
      container: "subscribeViewDiv",
      map: this._map,
      center: [26.50, 46.64],
      zoom: 5
    });

    const search = new Search({
      view: view
    });

    view.ui.add(search, {
      position: "top-right",
      index: 2
    });

    search.on("select-result", this.onSearchResult.bind(this));
  }

  onSearchResult(event : any) {
    this.subscribe.location = event.result.name;
  }

  send() {
    console.log(this.subscribe)
    this.subscrieService.addSubscription(this.subscribe).subscribe();
  }
}
