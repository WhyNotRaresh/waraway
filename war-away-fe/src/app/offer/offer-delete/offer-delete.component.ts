import { Component, OnInit } from '@angular/core';
import {MyOffersViewComponent} from "../my-offers-view/my-offers-view.component";

@Component({
  selector: 'app-offer-delete',
  templateUrl: './offer-delete.component.html',
  styleUrls: ['./offer-delete.component.css']
})
export class OfferDeleteComponent implements OnInit {

  constructor(public offers: MyOffersViewComponent) { }

  ngOnInit(): void {
  }

  delete() {
    this.offers.deleteSelectedOffer();
  }
}
