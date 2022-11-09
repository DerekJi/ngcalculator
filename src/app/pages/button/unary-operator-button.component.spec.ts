import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UnaryOperatorAction } from 'src/app/shared/store/calculator.actions';
import { initialState } from 'src/app/shared/store/calculator.reducers';
import { UnaryOperatorButtonComponent } from './unary-operator-button-component';
import { UnaryCalcOperator } from "src/app/shared/models/unary-operator.type";

describe('UnaryOperatorButtonComponent', () => {
  let component: UnaryOperatorButtonComponent;
  let fixture: ComponentFixture<UnaryOperatorButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnaryOperatorButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(UnaryOperatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.text).toBe('');
    expect(component.type).toBe('UNARY_OPERATOR');
  });

  it('onClick() should dispatch percentage action', () => {
    testOnClick('%');
  });
  
  it('onClick() should dispatch reverse action (1)', () => {
    testOnClick('±');
  });

  it('onClick() should dispatch square root action', () => {
    testOnClick('√');
  });

  it('onClick() should dispatch reverse action (2)', () => {
    testOnClick('∓');
  });

  const testOnClick = (oper: UnaryCalcOperator) => {
    // Arrange
    const expectedAction = arrangeOperator(oper);
    const dispatchSpy = spyOn(store, 'dispatch');

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  };

  const arrangeOperator = (oper: UnaryCalcOperator) => {
    component.text = oper;
    const expectedAction = UnaryOperatorAction({ oper });
    return expectedAction;
  };

});
