import { Action } from '@ngrx/store';

import { TodoActions } from '../actions/todo.actions';
import { FilterInterface } from '../models/filters';

export function visibilityFilter(state: FilterInterface = {title: 'All'}, action: Action): FilterInterface {
  switch (action.type) {
    case TodoActions.SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
}
