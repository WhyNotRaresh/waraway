export interface IRoute {
  originLat: string;
  originLong: string;
  destLat: string;
  destLong: string;
  destAddress: string;
  originAddress: string;
  distance: string;
}
export class Route implements IRoute{
  destAddress: string;
  destLat: string;
  destLong: string;
  distance: string;
  originAddress: string;
  originLat: string;
  originLong: string;


  constructor(destAddress: string, destLat: string, destLong: string, distance: string, originAddress: string, originLat: string, originLong: string) {
    this.destAddress = destAddress;
    this.destLat = destLat;
    this.destLong = destLong;
    this.distance = distance;
    this.originAddress = originAddress;
    this.originLat = originLat;
    this.originLong = originLong;
  }
}
