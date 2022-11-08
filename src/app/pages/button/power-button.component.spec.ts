import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { configuration } from 'src/app/app.configuration';
import { FsmState } from 'src/app/models/fsm-state.enum';
import { PowerAction } from 'src/app/state/calculator.actions';
import { initialState } from 'src/app/state/calculator.reducers';
import { selectFsmState } from 'src/app/state/calculator.selectors';
import { PowerButtonComponent } from './power-button-component';

describe('PowerButtonComponent', () => {
  let component: PowerButtonComponent;
  let fixture: ComponentFixture<PowerButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(PowerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.type).toBe('POWER');
  });

  it('text$ should be "On" since the current state is "PoweredOff"', () => {
    // Arrange
    store.overrideSelector(selectFsmState, FsmState.PoweredOff);

    // Act & Assert
    component.text$.subscribe((text: string) => {
      expect(text).toBe(configuration.ON);
    });
  });
  
  it('text$ should be "Off" since the current state is NOT "PoweredOff", but "OnStart"', () => {
    // Arrange
    store.overrideSelector(selectFsmState, FsmState.OnStart);

    // Act & Assert
    component.text$.subscribe((text: string) => {
      expect(text).toBe(configuration.OFF);
    });
  });
  
  it('text$ should be "Off" since the current state is NOT "PoweredOff", but "OnResult"', () => {
    // Arrange
    store.overrideSelector(selectFsmState, FsmState.OnResult);

    // Act & Assert
    component.text$.subscribe((text: string) => {
      expect(text).toBe(configuration.OFF);
    });
  });
  
  it('text$ should be "Off" since the current state is NOT "PoweredOff", but "OnError"', () => {
    // Arrange
    store.overrideSelector(selectFsmState, FsmState.OnError);

    // Act & Assert
    component.text$.subscribe((text: string) => {
      expect(text).toBe(configuration.OFF);
    });
  });
  
  it('onClick() should dispatch point action', () => {
    // Arrange
    const expectedAction = PowerAction();
    const dispatchSpy = spyOn(store, 'dispatch');

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
