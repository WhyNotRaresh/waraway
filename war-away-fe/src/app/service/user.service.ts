import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IUser} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {}

  addUser(user: IUser): Observable<any> {
    return this._http.post<IUser>('http://localhost:8080/protected/user/create', user);
  }

  getUserByEmail(email: string): Observable<any> {
    return this._http.get<IUser>(`http://localhost:8080/protected/user/${email}`)
  }
}
