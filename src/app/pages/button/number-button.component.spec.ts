import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NumberAction } from 'src/app/state/calculator.actions';
import { initialState } from 'src/app/state/calculator.reducers';
import { NumberButtonComponent } from './number-button-component';

describe('NumberButtonComponent', () => {
  let component: NumberButtonComponent;
  let fixture: ComponentFixture<NumberButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(NumberButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.text).toBe('');
    expect(component.type).toBe('NUMBER');
  });

  it('onClick() should dispatch number action', () => {
    testOnClick(5);
  });
  
  it('onClick() should dispatch substraction action', () => {
    testOnClick(0);
  });


  const testOnClick = (num: Number) => {
    // Arrange
    const expectedAction = arrangeOperator(num);
    const dispatchSpy = spyOn(store, 'dispatch');

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  };

  const arrangeOperator = (num: Number) => {
    component.text = num.toString();
    const expectedAction = NumberAction({ num });
    return expectedAction;
  };

});
