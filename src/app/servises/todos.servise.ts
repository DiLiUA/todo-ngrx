import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mapTo';

import { Todo } from '../models/todo';
import { FilterInterface } from '../models/filters';

@Injectable()
export class TodosService {
  todos = [
    {id: 1, title: 'Learn ngrx/store', completed: true},
    {id: 2, title: 'Learn ngrx/effects', completed: false}
  ];

  getTodos(filter): Observable<Todo[]> {
    const timer = 1000;

    return Observable.timer(timer).mapTo(this.getVisibleTodos(this.todos, filter));
  }

  addTodo(title: string): Observable<Todo> {
    const timer = 500;

    return Observable.timer(timer).mapTo(new Todo({title}));
  }

  removeTodo(todo: Todo): Observable<Todo> {
    const timer = 500;

    return Observable.timer(timer).mapTo(todo);
  }

  toggleDone(todo: Todo): Observable<Todo> {
    const timer = 500;

    return Observable.timer(timer).mapTo(todo);
  }

  getVisibleTodos(todos: Todo[], filter: FilterInterface): Todo[] {
    let filteredTodos;

    if (filter.title === 'Active') {
      filteredTodos = todos.filter(t => !t.completed);
    } else if (filter.title === 'Completed') {
      filteredTodos = todos.filter(t => t.completed);
    } else {
      filteredTodos = todos;
    }

    return filteredTodos.map(t => new Todo(t));
  }

}
