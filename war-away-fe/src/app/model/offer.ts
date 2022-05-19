import {User} from "./user";

export interface IOffer {
  id: number;
  user: User;
  phoneNumber: string;
  departurePoint: string;
  arrivalPoint: string;
  departureDate: Date;
  originLat: string;
  originLong: string;
  destLat: string;
  destLong: string;
  distance: string;
  personNumber: number;
  pets: string;
  description: string;
}

export class Offer implements IOffer {
  constructor(
    public id: number,
    public user: User,
    public phoneNumber: string,
    public departurePoint: string,
    public arrivalPoint: string,
    public departureDate: Date,
    public originLat: string,
    public originLong: string,
    public destLat: string,
    public destLong: string,
    public distance: string,
    public personNumber: number,
    public pets: string,
    public description: string
  ){
    this.id = id;
    this.user = user;
    this.phoneNumber = phoneNumber;
    this.departurePoint = departurePoint;
    this.arrivalPoint = arrivalPoint;
    this.departureDate = departureDate;
    this.originLat = originLat;
    this.originLong = originLong;
    this.destLat = destLat;
    this.destLong = destLong;
    this.distance = distance;
    this.personNumber = personNumber;
    this.pets = pets;
    this.description = description
  }
}
