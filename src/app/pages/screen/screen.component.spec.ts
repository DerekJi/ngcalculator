import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { configuration } from 'src/app/app.configuration';
import { initialState } from 'src/app/shared/store/calculator.reducers';
import { selectOperand } from 'src/app/shared/store/calculator.selectors';

import { ScreenComponent } from './screen.component';

describe('ScreenComponent', () => {
  let component: ScreenComponent;
  let fixture: ComponentFixture<ScreenComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);;
    fixture = TestBed.createComponent(ScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('value$ should convert strings longer than 12 to screen-fitted string', () => {
    // Arrange
    var selectValue = "123456789256633";
    store.overrideSelector(selectOperand, selectValue);

    // Act & Assert
    component.value$.subscribe((value: string) => {
      expect(value).not.toBe(selectValue);
      expect(value.length).toBeLessThanOrEqual(configuration.SCREEN_LENDTH);
    });
  });
});
