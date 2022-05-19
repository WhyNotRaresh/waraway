import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";
import {StorageService} from "../service/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;

  constructor(
    public auth: AuthService,
    public storage: StorageService,
    @Inject(DOCUMENT) private doc: Document,
    public router: Router
  ) {}

  ngOnInit() {
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.storage.clearStorage();
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
