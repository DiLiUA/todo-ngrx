import { TodoActions } from 'app/actions/todo.actions';
import { visibilityFilter } from './visibility-flter.reducer';

const oldState = {title: 'All'};

describe('Reducer. visibilityFilter', () => {

  it('should set visibility filter', () => {
    const filter = {title: 'Completed'};

    const newState = visibilityFilter(oldState, {type: TodoActions.SET_VISIBILITY_FILTER, payload: filter});

    expect(newState).toEqual(filter);
    expect(oldState.title).toEqual(oldState.title);
  });

  it('should return default state', () => {
    const newState = visibilityFilter(oldState, {type: 'test type'});

    expect(newState).toEqual(oldState);
  });

});
