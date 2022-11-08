import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BinaryOperatorAction } from 'src/app/state/calculator.actions';
import { initialState } from 'src/app/state/calculator.reducers';
import { BinaryOperatorButtonComponent } from './binary-operator-button-component';
import { BinaryCalcOperator } from "src/app/models/binary-operator.type";

describe('BinaryOperatorButtonComponent', () => {
  let component: BinaryOperatorButtonComponent;
  let fixture: ComponentFixture<BinaryOperatorButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinaryOperatorButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(BinaryOperatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.text).toBe('');
    expect(component.type).toBe('BINARY_OPERATOR');
  });

  it('onClick() should dispatch add action', () => {
    testOnClick('+');
  });
  
  it('onClick() should dispatch substraction action', () => {
    testOnClick('-');
  });

  it('onClick() should dispatch multiplication actions', () => {
    testOnClick('*');
  });

  it('onClick() should dispatch division actions', () => {
    testOnClick('/');
  });

  const testOnClick = (oper: BinaryCalcOperator) => {
    // Arrange
    const expectedAction = arrangeOperator(oper);
    const dispatchSpy = spyOn(store, 'dispatch');

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  };

  const arrangeOperator = (oper: BinaryCalcOperator) => {
    component.text = oper;
    const expectedAction = BinaryOperatorAction({ oper });
    return expectedAction;
  };

});
