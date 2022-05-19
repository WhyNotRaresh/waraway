import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISubscribe} from "../model/subscribe";

export type EntityArrayResponseType = HttpResponse<ISubscribe[]>;

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private _http: HttpClient) {}

  addSubscription(subscribe: ISubscribe): Observable<any> {
    return this._http.post<ISubscribe>('http://localhost:8080/offers/subscribe', subscribe);
  }

  getAllSubscriptions(): Observable<EntityArrayResponseType> {
    return this._http.get<ISubscribe[]>('http://localhost:8080/protected/subscribe/all', { observe: 'response' });
  }

  deleteSubscribeById(id: number): Observable<any> {
    console.log(id)
    return this._http.delete(`http://localhost:8080/protected/subscribe/${id}`);
  }
}
