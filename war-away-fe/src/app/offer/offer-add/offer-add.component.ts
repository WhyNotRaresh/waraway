import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OfferService} from "../../service/offer.service";
import {IOffer} from "../../model/offer";
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {IRoute} from "../../model/route";
import {IUser} from "@esri/arcgis-rest-auth";

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.css']
})
export class OfferAddComponent implements OnInit {

  public selectedRoute: IRoute | undefined;

  addForm: FormGroup | undefined;
  phoneNumberFC = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]*")
  ]);
  departureDateFC = new FormControl('', [Validators.required]);
  personNumberFC = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]*")
  ]);
  petsFC = new FormControl('', [Validators.required]);
  descriptionFC = new FormControl('', [Validators.required]);

  constructor(
    public storage: StorageService,
    public offerService: OfferService,
    private _router: Router,) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'phoneNumberFC': this.phoneNumberFC,
      'personNumberFC': this.personNumberFC,
      'departureDateFC': this.departureDateFC,
      'petsFC': this.petsFC,
      'descriptionFC': this.descriptionFC
    });
  }

  setSelectedRoute(route: IRoute) {
    this.selectedRoute = route;
  }

  onSubmit() {
    if (this.addForm?.valid && this.selectedRoute) {
      this.offerService.addOffer({
          'id': 0,
          'user': {
            'id': 0,
            'email': this.storage.getUser().email,
            'name': ""
          } as IUser,
          'phoneNumber': this.addForm.get('phoneNumberFC')?.value,
          'departurePoint': this.selectedRoute.originAddress,
          'arrivalPoint': this.selectedRoute.destAddress,
          'departureDate': this.addForm.get('departureDateFC')?.value,
          'originLat': this.selectedRoute.originLat,
          'originLong': this.selectedRoute.originLong,
          'destLat': this.selectedRoute.destLat,
          'destLong': this.selectedRoute.destLong,
          'distance': this.selectedRoute.distance,
          'personNumber': this.addForm.get('personNumberFC')?.value,
          'pets': this.addForm.get('petsFC')?.value,
          'description': this.addForm.get('descriptionFC')?.value
        } as IOffer)
        .subscribe(_ => {
          this._router.navigate(['offers/view']);
        });
    }
  }
}
