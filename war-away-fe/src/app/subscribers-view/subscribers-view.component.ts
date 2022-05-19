import { Component, OnInit } from '@angular/core';
import {StorageService} from "../service/storage.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {ISubscribe} from "../model/subscribe";
import {SubscribeService} from "../service/subscribe.service";
import {IOffer} from "../model/offer";

@Component({
  selector: 'app-subscribers-view',
  templateUrl: './subscribers-view.component.html',
  styleUrls: ['./subscribers-view.component.css']
})
export class SubscribersViewComponent implements OnInit {

  subscribers: ISubscribe[] | null = null;
  public selectedSubscriber: ISubscribe | undefined;

  constructor(
    private _subscribeService: SubscribeService,
    private _userService: StorageService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.subscribers = []
    this._subscribeService.getAllSubscriptions().subscribe(
      (reqs: HttpResponse<ISubscribe[]>) => this.subscribers = reqs.body);
  }

  selectSubscriber(index: number) {
    this.selectedSubscriber = this.subscribers?.[index];
  }

  deleteSubscriber() {
    if (this.selectedSubscriber) this._subscribeService.deleteSubscribeById(this.selectedSubscriber?.id).subscribe(
      () => window.location.reload()
    );
  }

}

