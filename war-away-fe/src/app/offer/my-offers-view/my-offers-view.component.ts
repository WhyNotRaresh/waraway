import { Component, OnInit } from '@angular/core';
import {IOffer} from "../../model/offer";
import {OfferService} from "../../service/offer.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-my-offers-view',
  templateUrl: './my-offers-view.component.html',
  styleUrls: ['./my-offers-view.component.css']
})
export class MyOffersViewComponent implements OnInit {

  offers: IOffer[] | null = null;
  public selectedOffer: IOffer | undefined;

  constructor(
    private _offerService: OfferService,
    private _userService: StorageService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.offers = []
    if (this._userService.isAdmin())
      this._offerService.getAllOffers().subscribe(
        (reqs: HttpResponse<IOffer[]>) => this.offers = reqs.body);
    else
      this._offerService.getAllOffersByUserId(this._userService.getUser().id).subscribe(
        (reqs: HttpResponse<IOffer[]>) => this.offers = reqs.body);
  }

  selectOffer(index: number) {
    this.selectedOffer = this.offers?.[index];
  }

  redirectTo(path: any): void {
    this._router.navigate([path]);
  }

  deleteSelectedOffer() {
    if (this.selectedOffer) this._offerService.deleteOfferById(this.selectedOffer?.id).subscribe(
      () => window.location.reload()
    );
  }
}
