import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sg-add-todo',
  templateUrl: 'add-todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {
  addTodoForm = new FormGroup({
    newTodo: new FormControl()
  });

  @Output() add = new EventEmitter<string>();

  @Input()
  set reset(action) {
    this.addTodoForm.reset();
  }

  addTodo(form: FormGroup): void {
    const textTodo = form.value.newTodo;

    if (textTodo) {
      this.add.emit(textTodo);
    }
  }

}
