import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {MapSelectRouteComponent} from "./offer/map-select-route/map-select-route.component";
import {OfferAddComponent} from "./offer/offer-add/offer-add.component";
import {MyOffersViewComponent} from "./offer/my-offers-view/my-offers-view.component";
import {SearchComponent} from "./search/search.component";
import {SubscribersViewComponent} from "./subscribers-view/subscribers-view.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'search', component: SearchComponent},
  { path: 'error', component: ErrorPageComponent},
  { path: 'map-route', component: MapSelectRouteComponent},
  { path: 'offer/add', component: OfferAddComponent},
  { path: 'offers/view', component: MyOffersViewComponent},
  { path: 'subscribers', component: SubscribersViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
