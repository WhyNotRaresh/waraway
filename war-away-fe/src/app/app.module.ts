import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {CoreModule, FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {AuthHttpInterceptor, AuthModule} from "@auth0/auth0-angular";
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './profile/profile.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { environment as env } from '../environments/environment';
import { MapShowComponent } from './map/map-show/map-show.component';
import { MapSelectRouteComponent } from './offer/map-select-route/map-select-route.component';
import { OfferAddComponent } from './offer/offer-add/offer-add.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { OfferViewComponent } from './offer/offer-view/offer-view.component';
import { MyOffersViewComponent } from './offer/my-offers-view/my-offers-view.component';
import { LoginRequiredComponent } from './home/login-required/login-required.component';
import { OfferDeleteComponent } from './offer/offer-delete/offer-delete.component';
import { FilterSearchComponent } from './filter-search/filter-search.component';
import {Observer} from "./service/observer";
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SearchComponent } from './search/search.component';
import { SubscribersViewComponent } from './subscribers-view/subscribers-view.component';
import { SubscriberDeleteComponent } from './subscriber-delete/subscriber-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ErrorPageComponent,
    ProfileComponent,
    MapShowComponent,
    MapSelectRouteComponent,
    OfferAddComponent,
    OfferViewComponent,
    MyOffersViewComponent,
    LoginRequiredComponent,
    OfferDeleteComponent,
    FilterSearchComponent,
    SubscribeComponent,
    SearchComponent,
    SubscribersViewComponent,
    SubscriberDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    FlexModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CoreModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HighlightModule,
    FontAwesomeModule,
    MatCheckboxModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
  ],
  providers: [
    Observer,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          json: () => import('highlight.js/lib/languages/json'),
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
