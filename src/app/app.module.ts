import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TodosPageComponent } from './components/todos-page/todos-page.component';
import { TodosComponent } from './components/todos/todos.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TodosService } from './servises/todos.servise';
import { TodosEffects } from './effects/todos.effects';
import { TodoActions } from './actions/todo.actions';
import reducer from './reducers/index.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TodosPageComponent,
    TodosComponent,
    AddTodoComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore({
      maxAge: 5
    }),
    EffectsModule.run(TodosEffects)
  ],
  providers: [
    TodosService,
    TodoActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
