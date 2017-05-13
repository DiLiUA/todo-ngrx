import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TodosPageComponent } from './todos-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodosComponent } from '../todos/todos.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { FiltersComponent } from '../filters/filters.component';
import { TodosEffects } from '../../effects/todos.effects';
import { TodosService } from '../../servises/todos.servise';
import { TodoActions } from '../../actions/todo.actions';
import { Todo } from '../../models/todo';
import reducer from '../../reducers/index.reducer';

describe('Component. FiltersComponent', () => {
  let context: TodosPageComponent;
  let fixture;
  let store;
  let actions;
  let todosSpy;
  let dispatchSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodosPageComponent,
        TodosComponent,
        AddTodoComponent,
        FiltersComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.provideStore(reducer)
      ],
      providers: [
        TodosService,
        TodosEffects,
        TodoActions,
        Actions
      ]
    });

    fixture = TestBed.createComponent(TodosPageComponent);
    context = fixture.debugElement.componentInstance;
    store = TestBed.get(Store);
    actions = TestBed.get(TodoActions);

    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    todosSpy = spyOn(store, 'select').and.returnValue(Observable.of({
      data: [
        new Todo({title: 'todo 1'}),
        new Todo({title: 'todo 2', completed: true})
      ],
      pending: false,
      error: null
    }));

    fixture.detectChanges();
  });

  it('should add new todo', fakeAsync(() => {
    const timer = 500;
    const title = 'test todo';

    context.addTodo(title);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.addTodo(title));

    fixture.detectChanges();

    context.addTodoSuccess$.subscribe(data => {
      expect(data.type).toEqual(TodoActions.ADD_TODO_SUCCESS);
    });

    tick(timer);
  }));

  it('should toggle done todo', () => {
    const todo = new Todo({title: 'test todo'});

    context.toggleDone(todo);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.toggleDone(todo));
  });

  it('should remove todo', () => {
    const todo = new Todo({title: 'test todo'});

    context.removeTodo(todo);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.removeTodo(todo));
  });

  it('should change visibility filter', () => {
    const filter = {title: 'Completed'};

    context.changeFilter(filter);

    expect(dispatchSpy).toHaveBeenCalledWith(actions.setVisibilityFilter(filter));

    context.todos.subscribe(data => {
      expect(data.data.length).toBe(1);
    });
  });

});
