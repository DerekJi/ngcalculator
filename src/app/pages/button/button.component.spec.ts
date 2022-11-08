import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/shared/store/calculator.reducers';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onKeyDown() should set key down class', () => {
    // Act
    component.onKeyDown();

    // Assert
    expect(component.keyDownClass).toBe('btn-down');
  });

  it('onKeyUp() should clear the key down class', () => {
    // Act
    component.onKeyUp();

    // Assert
    expect(component.keyDownClass).toBe('');
  });

  it('text$ should show the correct input', () => {
    // Arrange
    component.text = "some thing test";

    // Act & Assert
    component.text$.subscribe((text: string) => {
      expect(text).toBe(component.text);
    });
  });
});
