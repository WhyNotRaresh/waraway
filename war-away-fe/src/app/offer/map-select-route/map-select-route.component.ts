import { Component, OnInit } from '@angular/core';
import {loadModules} from "esri-loader";
import {OfferService} from "../../service/offer.service";
import {Router} from "@angular/router";
import {IRoute} from "../../model/route";
import {OfferAddComponent} from "../offer-add/offer-add.component";

@Component({
  selector: 'app-map-select-route',
  templateUrl: './map-select-route.component.html',
  styleUrls: ['./map-select-route.component.css']
})
export class MapSelectRouteComponent implements OnInit {

  private originLat: string | undefined;
  private originLong: string | undefined;
  private destLat: string | undefined;
  private destLong: string | undefined;
  public destAddress: string | undefined;
  public originAddress: string | undefined;
  public distance: string | undefined;

  constructor(
    private _router: Router,
    private _offerService: OfferService,
    public offer: OfferAddComponent
  ) {
  }

  ngOnInit(): void {

    loadModules([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",

      "esri/Graphic",
      "esri/rest/route",
      "esri/rest/support/RouteParameters",
      "esri/rest/support/FeatureSet",
      "esri/rest/locator",
      "esri/geometry/Point",
      "esri/geometry/geometryEngine",
      "esri/geometry/support/webMercatorUtils"
    ])
      .then(([esriConfig, Map, MapView, Graphic, route, RouteParameters, FeatureSet, Locator, Point, geometryEngine, webMercatorUtils]) => {

        esriConfig.apiKey = "AAPKbec7da2645c64a3f8afeead680c42d4fpyXywjAt8vY_wNfdPaTM4ykhreqWHXmWYPG1_wWtbOHr-U8bBBuRQfiIDvUfHLZ9";

        const map = new Map({
          basemap: "arcgis-navigation" //Basemap layer service
        });

        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: [26.50, 46.64],
          zoom: 5
        });

        const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
        const locatorUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

        view.on("click", async (event: any) => {

          // Put arrival point on map and calculate coordinates
          if (view.graphics.length === 0) {
            this.originLat = event.mapPoint.latitude.toFixed(3);
            this.originLong = event.mapPoint.longitude.toFixed(3);
            this.originAddress = await findAddress(event);
            this.destLat = undefined;
            this.destLong = undefined;
            this.destAddress = undefined;
            this.distance = undefined;

            addGraphic("origin", event.mapPoint);

            // Put destination point on map and calculate coordinates and distance
            // Show route and popup
          } else if (view.graphics.length === 1) {
            this.destLat = event.mapPoint.latitude.toFixed(3);
            this.destLong = event.mapPoint.longitude.toFixed(3);
            this.destAddress = await findAddress(event);

            if (this.destLat && this.destLong && this.destAddress)
              this.distance = getDistance(this.originLat!, this.originLong!, this.destLat, this.destLong)

            addGraphic("destination", event.mapPoint);
            getRoute(); // Call the route service
            displayRoutePopup(this.originAddress!, this.destAddress!, this.distance!);
          } else {
            view.graphics.removeAll();
          }

        });

        async function findAddress(evt: any) {
          const params = {
            location: evt.mapPoint
          };
          return Locator.locationToAddress(locatorUrl, params)
            .then(function (response: any) { // Show the address found
              return response.address;
            }, function (err: any) { // Show no address found
              return "";
            });
        }

        function displayRoutePopup(originAddress: string, destAddress: string, distance: string) {
          view.popup.open({
            title: "Route Info",
            content: "<br>From: " + originAddress +
              "<br>To: " + destAddress +
              "<br>Distance: " + distance + " km",
            position: "bottom-right",
          });
        }

        function addGraphic(type: string, point: any) {
          const graphic = new Graphic({
            symbol: {
              type: "simple-marker",
              color: (type === "origin") ? "white" : "black",
              size: "8px"
            },
            geometry: point
          });
          view.graphics.add(graphic);
        }

        function getRoute() {
          const routeParams = new RouteParameters({
            stops: new FeatureSet({
              features: view.graphics.toArray()
            }),

            returnDirections: true

          });

          route.solve(routeUrl, routeParams)
            .then(function (data: any) {
              data.routeResults.forEach(function (result: any) {
                result.route.symbol = {
                  type: "simple-line",
                  color: [138, 43, 226],
                  width: 3
                };
                view.graphics.add(result.route);
              });

            })

            .catch(function (error: any) {
              console.log(error);
            })
        }

        function getDistance(originLat: string, originLong: string, destLat: string, destLong: string) {
          let origin = new Point(originLat, originLong)
          let dest = new Point(destLat, destLong)

          let origin2 = webMercatorUtils.geographicToWebMercator(origin)
          let dest2 = webMercatorUtils.geographicToWebMercator(dest)

          return geometryEngine.distance(origin2, dest2, "kilometers").toFixed(2);
        }
      });
  }


  redirectTo(path: any): void {
    this._router.navigate([path]);
  }

  navigateWithState(path: string) {

    if (this.originLat && this.originLong && this.destLat && this.destLong && this.originAddress && this.destAddress)
      this._router.navigateByUrl(path, {
        state: {
          originLat: this.originLat,
          originLong: this.originLong,
          destLat: this.destLat,
          destLong: this.destLong,
          originAddress: this.originAddress,
          destAddress: this.destAddress,
          distance: this.distance
        }
      });
  }

  addRouteToStorage() {
    this.offer.setSelectedRoute({
      'destAddress': this.destAddress,
      'destLat': this.destLat,
      'destLong': this.destLong,
      'distance': this.distance,
      'originAddress': this.originAddress,
      'originLat': this.originLat,
      'originLong': this.originLong
    } as IRoute)
  }
}
