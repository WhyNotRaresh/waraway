import {Injectable} from "@angular/core";

export interface INotifiable {
  notify: (data: any) => void;
}

@Injectable({
  providedIn: "root"
})
export class Observer {
  objectsToNotify: INotifiable[] = [];

  public subscribe = (obj: INotifiable) : void => {
    this.objectsToNotify.push(obj);
  }

  public notify = (data: any) : void => {
    this.objectsToNotify.forEach(x => x.notify(data));
  }

}
