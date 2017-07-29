import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TodosPageComponent } from './components/todos-page/todos-page.component';
import { TodosComponent } from './components/todos/todos.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TodosEffects } from './effects/todos.effects';
import { TodosService } from './servises/todos.servise';
import { TodoActions } from 'app/actions/todo.actions';
import reducer from './reducers/index.reducer';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodosPageComponent,
        TodosComponent,
        AddTodoComponent,
        FiltersComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.provideStore(reducer),
        StoreDevtoolsModule.instrumentStore({
          maxAge: 5
        }),
        EffectsModule.run(TodosEffects)
      ],
      providers: [
        TodosService,
        TodoActions
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
