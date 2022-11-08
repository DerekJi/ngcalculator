import { TestBed } from '@angular/core/testing';

import { ScreenService } from './screen.service';

describe('ScreenService', () => {
  let service: ScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('toDisplay() should return empty string if operand is empty', () => {
    // Act
    const actual = service.toDisplay('', 12);

    // Assert
    expect(actual).toBe('');
  });

  it('toDisplay() should return original operand if it\'s an error', () => {
    // Act
    const error = 'Error: something wrong!';
    const actual = service.toDisplay(error, 12);

    // Assert
    expect(actual).toBe(error);
  });

  it('toDisplay() should return original operand if the length is not longer than maxLength', () => {
    // Act
    const operand = '12345678';
    const actual = service.toDisplay(operand, 8);

    // Assert
    expect(actual).toBe(operand);
  });
  
  it('toDisplay() should all if the length of the positive integer is longer than maxLength', () => {
    // Act
    const operand = '123456789';
    const actual = service.toDisplay(operand, 8);

    // Assert
    expect(actual).toContain('E');
  });
 
  
  it('toDisplay() should all if the length of the negative integer is longer than maxLength', () => {
    // Act
    const operand = '-12345678';
    const actual = service.toDisplay(operand, 8);

    // Assert
    expect(actual).toContain('E');
  });
});
