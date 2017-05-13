import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FilterInterface } from '../../models/filters';

@Component({
  selector: 'sg-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent {
  @Output() changeFilter = new EventEmitter<FilterInterface>();
  filter: string;
  filters: FilterInterface[];

  @Input() set active(val) {
    this.filter = val;
  }

  constructor() {
    this.filters = [{title: 'All'}, {title: 'Completed'}, {title: 'Active'}];
  }
}
