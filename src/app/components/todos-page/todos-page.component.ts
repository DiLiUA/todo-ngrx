import { Component, OnInit } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { TodosEffects } from '../../effects/todos.effects';
import { TodosService } from '../../servises/todos.servise';
import { TodoActions } from '../../actions/todo.actions';
import { FilterInterface } from '../../models/filters';
import { Todo } from '../../models/todo';
import { TodosInterface } from '../../reducers/todo.reducers';
import { AppStateInterface } from '../../reducers/index.reducer';

@Component({
  selector: 'sg-todos-page',
  templateUrl: 'todos-page.component.html'
})

export class TodosPageComponent implements OnInit {
  title: string;
  todos: Observable<TodosInterface>;
  addTodoSuccess$: Observable<Action>;
  activeFilter: Observable<FilterInterface>;
  filter: FilterInterface;

  constructor(private store: Store<AppStateInterface>,
              private todosEffects: TodosEffects,
              private todosService: TodosService,
              private todoActions: TodoActions) {
    this.title = 'todo list';
  }

  ngOnInit() {
    this.store.dispatch(this.todoActions.getTodos());
    this.todos = this.store.select('todos');
    this.addTodoSuccess$ = this.todosEffects.addTodo$.filter(({type}) => type === TodoActions.ADD_TODO_SUCCESS);
    this.activeFilter = this.store.select('visibilityFilter');
    this.activeFilter.subscribe(filter => {
      this.filter = filter;
    });
  }

  addTodo(title: string): void {
    this.store.dispatch(this.todoActions.addTodo(title));
    this.getTodosFromStore();
  }

  toggleDone(todo: Todo): void {
    this.store.dispatch(this.todoActions.toggleDone(todo));
    this.getTodosFromStore();
  }

  removeTodo(todo: Todo): void {
    this.store.dispatch(this.todoActions.removeTodo(todo));
    this.getTodosFromStore();
  }

  changeFilter(filter: FilterInterface): void {
    this.store.dispatch(this.todoActions.setVisibilityFilter(filter));
    this.activeFilter = this.store.select('visibilityFilter');
    this.getTodosFromStore(filter);
  }

  getTodosFromStore(filter: FilterInterface = this.filter): void {
    this.todos = this.store.select('todos')
      .map((obj: TodosInterface) =>
        Object.assign({}, obj, {data: this.todosService.getVisibleTodos(obj.data, filter)}));
  }
}
