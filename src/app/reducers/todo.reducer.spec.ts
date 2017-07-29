import { todos, TodosInterface } from './todo.reducers';
import { Todo } from '../models/todo';
import { TodoActions } from 'app/actions/todo.actions';

const todosMock = [
  new Todo({id: 1, title: 'test 1', completed: false}),
  new Todo({id: 2, title: 'test 2', completed: true})
];

const errorMock = {text: 'Error'};

describe('Reducer. Todo', () => {

  it('should send request for get todos and return new state with the pending key = true', () => {
    const oldState: TodosInterface = {
      data: [],
      pending: false,
      error: null
    };

    const newState = todos(oldState, {type: TodoActions.GET_TODOS});

    expect(newState.pending).toEqual(true);
    expect(oldState.pending).toEqual(false);
  });

  it('should get todos and return new state with array Todo and pending key = false', () => {
    const oldState: TodosInterface = {
      data: [],
      pending: true,
      error: null
    };

    const newState = todos(oldState, {type: TodoActions.GET_TODOS_SUCCESS, payload: todosMock});

    expect(newState.pending).toEqual(false);
    expect(newState.data).toEqual(todosMock);
    expect(oldState.pending).toEqual(true);
    expect(oldState.data).toEqual([]);
  });

  it('should try to get todos but return an error', () => {
    const oldState: TodosInterface = {
      data: [],
      pending: true,
      error: null
    };

    const newState = todos(oldState, {type: TodoActions.GET_TODOS_ERROR, payload: errorMock});

    expect(newState.pending).toEqual(false);
    expect(newState.error).toEqual(errorMock);
    expect(oldState.pending).toEqual(true);
    expect(oldState.error).toEqual(null);

  });

  it('should add new todo and return new state with new todo', () => {
    const oldState: TodosInterface = {
      data: [],
      pending: false,
      error: null
    };

    const newState = todos(oldState, {type: TodoActions.ADD_TODO_SUCCESS, payload: todosMock[0]});

    expect(newState.data.length).toEqual(1);
    expect(newState.data).toEqual([todosMock[0]]);
    expect(oldState.data.length).toEqual(0);
  });

  it('should try add new todo but return an error', () => {
    const oldState: TodosInterface = {
      data: [],
      pending: false,
      error: null
    };

    const newState = todos(oldState, {type: TodoActions.ADD_TODO_ERROR, payload: errorMock});

    expect(newState.error).toEqual(errorMock);
    expect(oldState.error).toEqual(null);
  });

  it('should remove todo and return new state', () => {
    const oldState: TodosInterface = {
      data: todosMock,
      pending: false,
      error: null
    };

    const expectedlength = 2;
    const newState = todos(oldState, {type: TodoActions.REMOVE_TODO_SUCCESS, payload: todosMock[0]});

    expect(newState.data.length).toEqual(1);
    expect(newState.data).toEqual([todosMock[1]]);
    expect(oldState.data.length).toEqual(expectedlength);
  });

  it('should try remove todo but return an error', () => {
    const oldState: TodosInterface = {
      data: todosMock,
      pending: false,
      error: null
    };

    const newState = todos(oldState, {type: TodoActions.REMOVE_TODO_ERROR, payload: errorMock});

    expect(newState.error).toEqual(errorMock);
    expect(oldState.error).toEqual(null);
  });

  it('should toggle done todo and return new state', () => {
    const oldState: TodosInterface = {
      data: todosMock,
      pending: false,
      error: null
    };

    const newState = todos(oldState, {type: TodoActions.TOGGLE_DONE_SUCCESS, payload: todosMock[0]});

    expect(newState.data[0].completed).toEqual(true);
    expect(oldState.data[0].completed).toEqual(false);
  });

  it('should try toggle done todo but return an error', () => {
    const oldState: TodosInterface = {
      data: todosMock,
      pending: false,
      error: null
    };

    const newState = todos(oldState, {type: TodoActions.TOGGLE_DONE_ERROR, payload: errorMock});

    expect(newState.error).toEqual(errorMock);
    expect(oldState.error).toEqual(null);
  });

  it('should return default state', () => {
    const oldState: TodosInterface = {
      data: todosMock,
      pending: false,
      error: null
    };

    const newState = todos(oldState, {type: 'test type'});

    expect(newState).toEqual(oldState);
  });

});
