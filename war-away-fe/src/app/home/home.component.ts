import {Component, OnInit,} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {StorageService} from "../service/storage.service";
import {Router} from "@angular/router";
import {SubscribeService} from "../service/subscribe.service";

import { JwtHelperService } from '@auth0/angular-jwt';
import contains from "@popperjs/core/lib/dom-utils/contains";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(public auth: AuthService,
              private userStorage: StorageService,
              public router: Router) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(
      (data) => {
        if (data && !this.userStorage.isUserStored()) {
          this.userStorage.storeUser();
          this.isLoggedIn = true;
        }
        else if (data)
          this.isLoggedIn = true;
      }
    )
  }
}
