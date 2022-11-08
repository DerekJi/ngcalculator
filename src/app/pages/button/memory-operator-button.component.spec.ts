import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoryOperatorAction } from 'src/app/shared/store/calculator.actions';
import { initialState } from 'src/app/shared/store/calculator.reducers';
import { MemoryOperatorButtonComponent } from './memory-operator-button-component';
import { MemoryOperator } from "src/app/shared/models/memory-operator.type";

describe('MemoryOperatorButtonComponent', () => {
  let component: MemoryOperatorButtonComponent;
  let fixture: ComponentFixture<MemoryOperatorButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryOperatorButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(MemoryOperatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.text).toBe('');
    expect(component.type).toBe('MEMORY_OPERATOR');
  });

  it('onClick() should dispatch M+ action', () => {
    testOnClick('M+');
  });
  
  it('onClick() should dispatch M- action', () => {
    testOnClick('M-');
  });

  it('onClick() should dispatch MC action', () => {
    testOnClick('MC');
  });

  it('onClick() should dispatch MS action', () => {
    testOnClick('MS');
  });

  const testOnClick = (oper: MemoryOperator) => {
    // Arrange
    const expectedAction = arrangeOperator(oper);
    const dispatchSpy = spyOn(store, 'dispatch');

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  };

  const arrangeOperator = (oper: MemoryOperator) => {
    component.text = oper;
    const expectedAction = MemoryOperatorAction({ oper });
    return expectedAction;
  };

});
