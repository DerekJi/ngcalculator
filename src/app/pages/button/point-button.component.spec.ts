import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PointAction } from 'src/app/shared/store/calculator.actions';
import { initialState } from 'src/app/shared/store/calculator.reducers';
import { PointButtonComponent } from './point-button-component';

describe('PointButtonComponent', () => {
  let component: PointButtonComponent;
  let fixture: ComponentFixture<PointButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(PointButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    // 
    expect(component.text).toBe('.');
    expect(component.type).toBe('POINT');
  });
  
  it('onClick() should dispatch point action', () => {
    // Arrange
    const expectedAction = PointAction();
    const dispatchSpy = spyOn(store, 'dispatch');

    // Act
    component.onClick();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
