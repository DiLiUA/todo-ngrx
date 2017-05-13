import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { TodosService } from '../servises/todos.servise';
import { TodoActions } from '../actions/todo.actions';
import { AppStateInterface } from '../reducers/index.reducer';

@Injectable()
export class TodosEffects {

  @Effect() getTodos$ = this.actions$
    .ofType(TodoActions.GET_TODOS)
    .withLatestFrom(this.store.select('visibilityFilter'), (action, filter) => {
      return filter;
    })
    .switchMap(filter =>
      this.todosService.getTodos(filter)
        .map(todos => ({type: TodoActions.GET_TODOS_SUCCESS, payload: todos}))
        .catch(err => Observable.of({type: TodoActions.GET_TODOS_ERROR, payload: err})));

  @Effect() addTodo$ = this.actions$
    .ofType(TodoActions.ADD_TODO)
    .switchMap(action =>
      this.todosService.addTodo(action.payload)
        .map(todo => ({type: TodoActions.ADD_TODO_SUCCESS, payload: todo}))
        .catch(err => Observable.of({type: TodoActions.ADD_TODO_ERROR, payload: err})));

  @Effect() removeTodo$ = this.actions$
    .ofType(TodoActions.REMOVE_TODO)
    .switchMap(action =>
      this.todosService.removeTodo(action.payload)
        .map(todo => ({type: TodoActions.REMOVE_TODO_SUCCESS, payload: todo}))
        .catch(err => Observable.of({type: TodoActions.REMOVE_TODO_ERROR, payload: err})));

  @Effect() toggleDone$ = this.actions$
    .ofType(TodoActions.TOGGLE_DONE)
    .switchMap(action =>
      this.todosService.toggleDone(action.payload)
        .map(todo => ({type: TodoActions.TOGGLE_DONE_SUCCESS, payload: todo}))
        .catch(err => Observable.of({type: TodoActions.TOGGLE_DONE_ERROR, payload: err})));

  constructor(private actions$: Actions,
              private todosService: TodosService,
              private store: Store<AppStateInterface>) {
  }
}
