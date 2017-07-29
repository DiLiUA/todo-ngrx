import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TodosService } from './todos.servise';
import { Todo } from '../models/todo';

const fakeTodos = [
  {id: 1, title: 'test 1', completed: true},
  {id: 2, title: 'test 2', completed: false}
];

describe('Actions. Todo', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService
      ]
    });
    service = TestBed.get(TodosService);
  });

  it('should get empty todos', fakeAsync(() => {
    let todos;
    const timer = 1000;
    service.todos = [];

    service.getTodos({title: 'All'}).subscribe(data => {
      todos = data;
    });

    tick(timer);

    expect(todos).toEqual([]);
  }));

  it('should get todos', fakeAsync(() => {
    let todos;
    const timer = 1000;
    service.todos = fakeTodos;

    const expectedTodos = [
      new Todo(fakeTodos[0]),
      new Todo(fakeTodos[1])
    ];

    service.getTodos({title: 'All'}).subscribe(data => {
      todos = data;
    });

    tick(timer);

    expect(todos).toEqual(expectedTodos);
  }));

  it('should get new todo', fakeAsync(() => {
    const timer = 500;
    const title = 'test todo';
    let todo;

    service.addTodo(title).subscribe(data => {
      todo = data;
    });

    tick(timer);

    expect(todo.title).toEqual(new Todo({title}).title);
  }));

  it('should get remove todo', fakeAsync(() => {
    const timer = 500;
    let todo;
    const removingTodo = new Todo({title: 'test todo'});

    service.removeTodo(removingTodo).subscribe(data => {
      todo = data;
    });

    tick(timer);

    expect(todo).toEqual(removingTodo);
  }));

  it('should toggle done todo', fakeAsync(() => {
    const timer = 500;
    let todo;
    const togglingTodo = new Todo({title: 'test todo'});

    service.toggleDone(togglingTodo).subscribe(data => {
      todo = data;
    });

    tick(timer);

    expect(todo).toEqual(togglingTodo);
  }));

  it('should get all todos', () => {
    const todos = [
      new Todo({id: 1, title: 'test 1', completed: true}),
      new Todo({id: 2, title: 'test 2', completed: false})
    ];
    const filter = {title: 'All'};

    const expectedTodo = service.getVisibleTodos(todos, filter);

    expect(expectedTodo).toEqual(todos);
  });

  it('should get completed todos', () => {
    const todos = [
      new Todo({id: 1, title: 'test 1', completed: true}),
      new Todo({id: 2, title: 'test 2', completed: false})
    ];
    const filter = {title: 'Completed'};

    const expectedTodo = service.getVisibleTodos(todos, filter);

    expect(expectedTodo.length).toEqual(1);
    expect(expectedTodo[0]).toEqual(todos[0]);
  });

  it('should get active todos', () => {
    const todos = [
      new Todo({id: 1, title: 'test 1', completed: true}),
      new Todo({id: 2, title: 'test 2', completed: false})
    ];
    const filter = {title: 'Active'};

    const expectedTodo = service.getVisibleTodos(todos, filter);

    expect(expectedTodo.length).toEqual(1);
    expect(expectedTodo[0]).toEqual(todos[1]);
  });

});
