import { Injectable } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {IUser, User} from "../model/user";
import {UserService} from "./user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public auth: AuthService,
              private userService: UserService) { }

  public storeUser() {
   this.auth.user$.subscribe(
     (data) => {
       if (data?.email)
         this.userService.getUserByEmail(data?.email).subscribe(
           (user: IUser | null) => {
             if (user != null) {
               localStorage.setItem('currentUser', JSON.stringify(user));
             } else {
               let currentUser = new User({
                 'id' : 0,
                 'email': data?.email,
                 'firstName': data?.given_name,
                 'lastName': data?.family_name,
                 'pictureUrl': data?.picture
               } as IUser);
               this.userService.addUser(currentUser).subscribe(
                 (returnedUser: IUser) => {
                   localStorage.setItem('currentUser', JSON.stringify(returnedUser));
                 }
               );
             }

             this.auth.getAccessTokenSilently().subscribe(
               data => {
                 const helper = new JwtHelperService();
                 let permissions = helper.decodeToken(data).permissions;
                 if (permissions.includes('admin'))
                   this.setRole('ADMIN')
                 else
                  this.setRole('BASIC')
               }
             )
           }
         );
     })
  }

  public getUser(): IUser{
    return JSON.parse(<string>localStorage.getItem('currentUser'));
  }

  public isUserStored(): boolean {
    if (localStorage.getItem('currentUser') != null)
      return true;
    return false;
  }

  public clearStorage() {
    localStorage.clear()
  }

  public isAdmin(): boolean {
    if (localStorage.getItem('ROLE') && localStorage.getItem('ROLE') == 'ADMIN')
      return true;
    return false;
  }

  public setRole(role: string) {
    localStorage.setItem('ROLE', role);
  }
}
