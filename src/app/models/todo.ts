export interface TodoInterface {
  title: string;
  completed?: boolean;
  id?: number;
}

export class Todo {
  title: string;
  completed: boolean;
  id: number;

  constructor(todo: TodoInterface) {
    this.title = todo.title;
    this.completed = todo.completed || false;
    this.id = todo.id || new Date().getMilliseconds();
  }
}
