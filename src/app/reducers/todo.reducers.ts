import { Action } from '@ngrx/store';

import { TodoActions } from '../actions/todo.actions';
import { Todo } from '../models/todo';

export interface TodosInterface {
  data: Todo[];
  pending: boolean;
  error: Object;
}

const initialState: TodosInterface = {
  data: [],
  pending: false,
  error: null
};

export function todos(state = initialState, action: Action): TodosInterface {
  switch (action.type) {
    case TodoActions.GET_TODOS:
      return Object.assign({}, state, {pending: true, error: null});

    case TodoActions.GET_TODOS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, pending: false});

    case TodoActions.GET_TODOS_ERROR:
      return Object.assign({}, state, {pending: false, error: action.payload});

    case TodoActions.ADD_TODO_SUCCESS:
      return Object.assign({}, state, {data: state.data.concat([action.payload]), error: null});

    case TodoActions.ADD_TODO_ERROR:
      return Object.assign({}, state, {error: action.payload});

    case TodoActions.REMOVE_TODO_SUCCESS:
      return Object.assign({}, state, {data: state.data.filter(todo => todo.id !== action.payload.id), error: null});

    case TodoActions.REMOVE_TODO_ERROR:
      return Object.assign({}, state, {error: action.payload});

    case TodoActions.TOGGLE_DONE_SUCCESS:
      const todos = state.data.map(todo => {
        if (todo.id === action.payload.id) {
          return Object.assign({}, todo, {completed: !todo.completed});
        } else {
          return Object.assign({}, todo);
        }
      });

      return Object.assign({}, state, {data: todos});

    case TodoActions.TOGGLE_DONE_ERROR:
      return Object.assign({}, state, {error: action.payload});

    default:
      return state;
  }
}
