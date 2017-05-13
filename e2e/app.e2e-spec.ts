import { TodoNgrxPage } from './app.po';

describe('todo-ngrx App', () => {
  let page: TodoNgrxPage;

  beforeEach(() => {
    page = new TodoNgrxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
