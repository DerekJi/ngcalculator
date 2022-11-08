import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EqualAction } from 'src/app/state/calculator.actions';
import { initialState } from 'src/app/state/calculator.reducers';
import { EqualButtonComponent } from './equal-button-component';

describe('EqualButtonComponent', () => {
  let component: EqualButtonComponent;
  let fixture: ComponentFixture<EqualButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqualButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(EqualButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.text).toBe('=');
    expect(component.type).toBe('EQUAL');
  });

  it('onClick() should dispatch BackspaceAction', () => {
    // Arrange
    const dispatchSpy = spyOn(store, 'dispatch');
    const expectedAction = EqualAction();

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
