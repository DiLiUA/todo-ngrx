import { TestBed } from '@angular/core/testing';

import { TodoActions } from './todo.actions';
import { Todo } from '../models/todo';

describe('Actions. Todo', () => {
  let service: TodoActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoActions
      ]
    });
    service = TestBed.get(TodoActions);
  });

  it('should return action for get todos', () => {
    const expectedAction = {
      type: TodoActions.GET_TODOS
    };

    const action = service.getTodos();

    expect(action).toEqual(expectedAction);
  });

  it('should return action for add new todo', () => {
    const expectedAction = {
      type: TodoActions.ADD_TODO,
      payload: 'test todo'
    };

    const action = service.addTodo(expectedAction.payload);

    expect(action).toEqual(expectedAction);
  });

  it('should return action for remove todo', () => {
    const expectedAction = {
      type: TodoActions.REMOVE_TODO,
      payload: new Todo({title: 'test todo'})
    };

    const action = service.removeTodo(expectedAction.payload);

    expect(action).toEqual(expectedAction);
  });

  it('should return action for toggle done todo', () => {
    const expectedAction = {
      type: TodoActions.TOGGLE_DONE,
      payload: new Todo({title: 'test todo'})
    };

    const action = service.toggleDone(expectedAction.payload);

    expect(action).toEqual(expectedAction);
  });

  it('should return action for set visibility filter', () => {
    const expectedAction = {
      type: TodoActions.SET_VISIBILITY_FILTER,
      payload: {title: 'Completed'}
    };

    const action = service.setVisibilityFilter(expectedAction.payload);

    expect(action).toEqual(expectedAction);
  });

});
