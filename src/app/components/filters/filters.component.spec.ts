import { TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('Component. FiltersComponent', () => {
  let context: FiltersComponent;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltersComponent
      ]
    });

    fixture = TestBed.createComponent(FiltersComponent);
    context = fixture.debugElement.componentInstance;
  });

  it('should set filter', () => {
    const newFilter = 'Completed';
    context.filter = 'All';
    context.active = newFilter;

    expect(context.filter).toEqual(newFilter);
  });
});
