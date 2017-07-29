import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';
import { FilterInterface } from '../models/filters';

@Injectable()
export class TodoActions {
  static GET_TODOS = '[Todo] Get Todos';
  static GET_TODOS_SUCCESS = '[Todo] Get todos Success';
  static GET_TODOS_ERROR = '[Todo] Get todos Error';

  static ADD_TODO = '[Todo] Add Todo';
  static ADD_TODO_SUCCESS = '[Todo] Add Todo Success';
  static ADD_TODO_ERROR = '[Todo] Add Todo Error';

  static REMOVE_TODO = '[Todo] remove Todo';
  static REMOVE_TODO_SUCCESS = '[Todo] remove Todo Success';
  static REMOVE_TODO_ERROR = '[Todo] remove Todo Error';

  static TOGGLE_DONE = '[Todo] Toggle Done';
  static TOGGLE_DONE_SUCCESS = '[Todo] Toggle Done Success';
  static TOGGLE_DONE_ERROR = '[Todo] Toggle Done Error';

  static SET_VISIBILITY_FILTER = '[Todo] Set Visibility Filter';

  getTodos(): Action {
    return {
      type: TodoActions.GET_TODOS
    };
  }

  addTodo(title: string): Action {
    return {
      type: TodoActions.ADD_TODO,
      payload: title
    };
  }

  removeTodo(todo: Todo): Action {
    return {
      type: TodoActions.REMOVE_TODO,
      payload: todo
    };
  }

  toggleDone(todo: Todo): Action {
    return {
      type: TodoActions.TOGGLE_DONE,
      payload: todo
    };
  }

  setVisibilityFilter(filter: FilterInterface): Action {
    return {
      type: TodoActions.SET_VISIBILITY_FILTER,
      payload: filter
    };
  }
}
