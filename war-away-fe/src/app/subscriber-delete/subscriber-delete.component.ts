import { Component, OnInit } from '@angular/core';
import {SubscribersViewComponent} from "../subscribers-view/subscribers-view.component";

@Component({
  selector: 'app-subscriber-delete',
  templateUrl: './subscriber-delete.component.html',
  styleUrls: ['./subscriber-delete.component.css']
})
export class SubscriberDeleteComponent implements OnInit {

  constructor(public subscriber: SubscribersViewComponent) { }

  ngOnInit(): void {
  }

  delete() {
    this.subscriber.deleteSubscriber();
  }

}
