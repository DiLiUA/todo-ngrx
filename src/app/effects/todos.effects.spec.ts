import { TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { TodosEffects } from './todos.effects';
import { TodosService } from '../servises/todos.servise';
import { StoreModule } from '@ngrx/store';
import reducer from '../reducers/index.reducer';
import { Todo } from '../models/todo';
import { TodoActions } from '../actions/todo.actions';

describe('Effects. Todo', () => {
  let runner;
  let effect;
  let service;
  let actions: TodoActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule,
        StoreModule.provideStore(reducer)
      ],
      providers: [
        TodosEffects,
        TodosService,
        EffectsRunner,
        TodoActions
      ]
    });

    effect = TestBed.get(TodosEffects);
    runner = TestBed.get(EffectsRunner);
    service = TestBed.get(TodosService);
    actions = TestBed.get(TodoActions);
  });

  it('should return a GET_TODOS_SUCCESS action with todo list', () => {
    const todos = [
      new Todo({id: 1, title: 'test 1', completed: true}),
      new Todo({id: 2, title: 'test 2', completed: false})
    ];

    spyOn(service, 'getTodos').and.returnValue(Observable.of(todos));

    const expectedTodos = {
      type: TodoActions.GET_TODOS_SUCCESS,
      payload: todos
    };

    runner.queue(actions.getTodos());

    effect.getTodos$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return a GET_TODOS_ERROR action with the error', () => {
    const err = {title: 'error text'};

    spyOn(service, 'getTodos').and.returnValue(Observable.throw(err));

    const expectedTodos = {
      type: TodoActions.GET_TODOS_ERROR,
      payload: err
    };

    runner.queue(actions.getTodos());

    effect.getTodos$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return a ADD_TODO_SUCCESS action with adding todo', () => {
    const title = 'test todo';

    spyOn(service, 'addTodo').and.returnValue(Observable.of(new Todo({title})));

    const expectedTodos = {
      type: TodoActions.ADD_TODO_SUCCESS,
      payload: new Todo({title})
    };

    runner.queue(actions.addTodo(title));

    effect.addTodo$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return a ADD_TODO_ERROR action with the error', () => {
    const title = 'test todo';
    const err = {title: 'error text'};

    spyOn(service, 'addTodo').and.returnValue(Observable.throw(err));

    const expectedTodos = {
      type: TodoActions.ADD_TODO_ERROR,
      payload: err
    };

    runner.queue(actions.addTodo(title));

    effect.addTodo$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return a REMOVE_TODO_SUCCESS action with removing todo', () => {
    const todo = new Todo({title: 'test todo'});

    spyOn(service, 'removeTodo').and.returnValue(Observable.of(todo));

    const expectedTodos = {
      type: TodoActions.REMOVE_TODO_SUCCESS,
      payload: todo
    };

    runner.queue(actions.removeTodo(todo));

    effect.removeTodo$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return a REMOVE_TODO_ERROR action with the error', () => {
    const todo = new Todo({title: 'test todo'});
    const err = {title: 'error text'};

    spyOn(service, 'removeTodo').and.returnValue(Observable.throw(err));

    const expectedTodos = {
      type: TodoActions.REMOVE_TODO_ERROR,
      payload: err
    };

    runner.queue(actions.removeTodo(todo));

    effect.removeTodo$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return a TOGGLE_DONE_SUCCESS action with toggling todo', () => {
    const todo = new Todo({title: 'test todo'});

    spyOn(service, 'toggleDone').and.returnValue(Observable.of(todo));

    const expectedTodos = {
      type: TodoActions.TOGGLE_DONE_SUCCESS,
      payload: todo
    };

    runner.queue(actions.toggleDone(todo));

    effect.toggleDone$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

  it('should return a TOGGLE_DONE_ERROR action with the error', () => {
    const todo = new Todo({title: 'test todo'});
    const err = {title: 'error text'};

    spyOn(service, 'toggleDone').and.returnValue(Observable.throw(err));

    const expectedTodos = {
      type: TodoActions.TOGGLE_DONE_ERROR,
      payload: err
    };

    runner.queue(actions.toggleDone(todo));

    effect.toggleDone$.subscribe(data => {
      expect(data).toEqual(expectedTodos);
    });
  });

});
