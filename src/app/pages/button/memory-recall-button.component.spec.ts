import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoryRecallAction } from 'src/app/state/calculator.actions';
import { initialState } from 'src/app/state/calculator.reducers';
import { MemoryRecallButtonComponent } from './memory-recall-button-component';

describe('MemoryRecallButtonComponent', () => {
  let component: MemoryRecallButtonComponent;
  let fixture: ComponentFixture<MemoryRecallButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryRecallButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(MemoryRecallButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.text).toBe('MR');
    expect(component.type).toBe('MEMORY_RECALL');
  });
  
  it('onClick() should dispatch point action', () => {
    // Arrange
    const expectedAction = MemoryRecallAction();
    const dispatchSpy = spyOn(store, 'dispatch');

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
