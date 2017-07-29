import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddTodoComponent } from './add-todo.component';

describe('Component. FiltersComponent', () => {
  let context: AddTodoComponent;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AddTodoComponent
      ]
    });

    fixture = TestBed.createComponent(AddTodoComponent);
    context = fixture.debugElement.componentInstance;
  });

  it('runtime coverage. should not add todo if provided text is empty', () => {
    const form = new FormGroup({
      newTodo: new FormControl()
    });
    const add = spyOn(context.add, 'emit');

    form.patchValue({newTodo: ''});

    context.addTodo(form);

    expect(add).toHaveBeenCalledTimes(0);
  });

  it('should add new todo', () => {
    const form = new FormGroup({
      newTodo: new FormControl()
    });
    const add = spyOn(context.add, 'emit');

    form.patchValue({newTodo: 'test todo'});

    context.addTodo(form);

    expect(add).toHaveBeenCalledTimes(1);
  });

  it('should reset form', () => {
    const reset = spyOn(context.addTodoForm, 'reset');

    context.reset = true;

    expect(reset).toHaveBeenCalledTimes(1);
  });
});
