import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BackspaceAction } from 'src/app/state/calculator.actions';
import { initialState } from 'src/app/state/calculator.reducers';
import { BackspaceButtonComponent } from './backspace-button-component';

describe('BackspaceButtonComponent', () => {
  let component: BackspaceButtonComponent;
  let fixture: ComponentFixture<BackspaceButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackspaceButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(BackspaceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.text).toBe('⌫');
    expect(component.type).toBe('BACKSPACE');
  });

  it('onClick() should dispatch BackspaceAction', () => {
    // Arrange
    const dispatchSpy = spyOn(store, 'dispatch');
    const expectedAction = BackspaceAction();

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
