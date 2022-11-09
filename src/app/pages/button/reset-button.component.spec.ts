import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ResetType } from 'src/app/shared/models/reset-type.enum';
import { ResetAction } from 'src/app/shared/store/calculator.actions';
import { initialState } from 'src/app/shared/store/calculator.reducers';
import { ResetButtonComponent } from './reset-button-component';

describe('ResetButtonComponent', () => {
  let component: ResetButtonComponent;
  let fixture: ComponentFixture<ResetButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ResetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.type).toBe('OPERATOR');
  });

  it('onClick() should dispatch reset action', () => {
    testOnClick(ResetType.C);
  });
  
  it('onClick() should dispatch reset all action', () => {
    testOnClick(ResetType.CE);
  });


  const testOnClick = (resetType: ResetType) => {
    // Arrange
    const expectedAction = arrangeOperator(resetType);
    const dispatchSpy = spyOn(store, 'dispatch');

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  };

  const arrangeOperator = (resetType: ResetType) => {
    component.text = resetType.toString();
    const expectedAction = ResetAction({ resetType });
    return expectedAction;
  };

});
