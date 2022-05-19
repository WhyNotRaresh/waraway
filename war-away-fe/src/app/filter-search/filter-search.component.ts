import {Component, OnInit} from '@angular/core';
import {IFilter} from "../model/filter";
import {MapShowComponent} from "../map/map-show/map-show.component";
import {Observer} from "../service/observer";

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent implements OnInit {

  public filter: IFilter = {
    date: undefined,
    personNumber: undefined,
    pets: undefined
  };

  constructor(private observer: Observer) {}

  ngOnInit(): void {}

  save() {
    this.observer.notify(this.filter);
  }

}
