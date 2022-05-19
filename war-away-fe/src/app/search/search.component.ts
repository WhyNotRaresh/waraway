import { Component, OnInit } from '@angular/core';
import {IOffer} from "../model/offer";
import {AuthService} from "@auth0/auth0-angular";
import {StorageService} from "../service/storage.service";
import {OfferService} from "../service/offer.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isLoggedIn: boolean = false;
  offers: IOffer[] | null = [];

  constructor(public auth: AuthService,
              private userStorage: StorageService,
              private offerService: OfferService,
              public router: Router) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(
      (data) => {
        if (data && !this.userStorage.isUserStored()) {
          this.userStorage.storeUser();
        }
        else if (data)
          this.isLoggedIn = true;
      }
    )

    this.offerService.getAllOffers().subscribe(
      (data: HttpResponse<IOffer[]>) => { this.offers = data.body});
  }

  redirectTo(path: any): void {
    this.router.navigate([path]);
  }

}
