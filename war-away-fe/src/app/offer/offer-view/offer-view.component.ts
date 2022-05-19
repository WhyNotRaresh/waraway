import {Component, OnInit} from '@angular/core';
import {MyOffersViewComponent} from "../my-offers-view/my-offers-view.component";

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.css']
})
export class OfferViewComponent implements OnInit {

  constructor(public offers: MyOffersViewComponent) { }

  ngOnInit(): void {
  }
}
