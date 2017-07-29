import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sg-todos',
  templateUrl: 'todos.component.html'
})
export class TodosComponent {
  @Input() todos;
  @Output() toggleDone = new EventEmitter();
  @Output() removeTodo = new EventEmitter();
}
