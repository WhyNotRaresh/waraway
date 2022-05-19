import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IOffer} from "../model/offer";

export type EntityArrayResponseType = HttpResponse<IOffer[]>;

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private _http: HttpClient) {}

  addOffer(offer: IOffer): Observable<any> {
    return this._http.post<IOffer>('http://localhost:8080/protected/offer/create', offer);
  }

  getAllOffersByUserId(id: number): Observable<EntityArrayResponseType> {
    return this._http.get<IOffer[]>(`http://localhost:8080/protected/offers/${id}`, { observe: 'response' });
  }

  getAllOffers(): Observable<EntityArrayResponseType> {
    return this._http.get<IOffer[]>('http://localhost:8080/offers/all', { observe: 'response' });
  }

  deleteOfferById(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/protected/offer/${id}`);
  }
}
