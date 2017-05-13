import { combineReducers } from '@ngrx/store';

import { todos, TodosInterface } from './todo.reducers';
import { visibilityFilter } from './visibility-flter.reducer';
import { FilterInterface } from '../models/filters';
import { compose } from '@ngrx/core';

export interface AppStateInterface {
  todos: TodosInterface;
  visibilityFilter: FilterInterface;
}

export default compose(combineReducers)({
  todos,
  visibilityFilter
});
