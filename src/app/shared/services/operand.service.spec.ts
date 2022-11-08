import { TestBed } from '@angular/core/testing';

import { OperandService } from './operand.service';

describe('OperandService', () => {
  let service: OperandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('backspace() should return "0", if only 1 number', () => {
    for (let i = 0; i < 10; i++) {
      // Act 
      var result = service.backspace(i.toString());

      // Assert
      expect(result).toBe('0');
    }
  });

  it('backspace() should return "0", if only a Point (.)', () => {
    // Act 
    var result = service.backspace('.');

    // Assert
    expect(result).toBe('0');
  });
  
  it('backspace() should remove the last digit of a positive integer ', () => {
    // Act 
    var result = service.backspace('2323');

    // Assert
    expect(result).toBe('232');
  });
  
  it('backspace() should remove the last digit of a negative integer ', () => {
    // Act 
    var result = service.backspace('-2323');

    // Assert
    expect(result).toBe('-232');
  });

  it('backspace() should remove the last digit of a positive float ', () => {
    // Act 
    var result = service.backspace('2323.23');

    // Assert
    expect(result).toBe('2323.2');
  });
  
  it('backspace() should keep dot for a positive float with one digit after dot', () => {
    // Act 
    var result = service.backspace('2323.2');

    // Assert
    expect(result).toBe('2323.');
  });

  it('backspace() should keep dot for a negative integer with one digit after dot', () => {
    // Act 
    var result = service.backspace('-2323.3');

    // Assert
    expect(result).toBe('-2323.');
  });

  it('appendNumber() should not start with "0" if the source operand is "0"', () => {
    // Act 
    var result = service.appendNumber('0', 1);

    // Assert
    expect(result).toBe('1');
  });

  it('appendNumber() should start with the source operand', () => {
    // Act 
    const operand = '23';
    var result = service.appendNumber(operand, 1);

    // Assert
    expect(result).toBe('231');
  });

  it('appendPoint() should not change if the source operand contains point', () => {
    // Act 
    const operand = '2.3';
    var result = service.appendPoint(operand);

    // Assert
    expect(result).toBe(operand);
  });

  
  it('appendPoint() should change with point if the source operand does not contain point', () => {
    // Act 
    const operand = '-2';
    var result = service.appendPoint(operand);

    // Assert
    expect(result).toBe('-2.');
  });

  it('calculate() should add the two operands', () => {
    // Arrange
    const op1 = '3';
    const op2 = '4';
    const expected = '7';

    // Act
    const result = service.calculate(op1, op2, '+');

    // Assert
    expect(result).toBe(expected);
  });

  it('calculate() should substract the two operands', () => {
    // Arrange
    const op1 = '3';
    const op2 = '4';
    const expected = '-1';

    // Act
    const result = service.calculate(op1, op2, '-');

    // Assert
    expect(result).toBe(expected);
  });

  it('calculate() should multiply the two operands with "*"', () => {
    // Arrange
    const op1 = '3';
    const op2 = '4';
    const expected = '12';

    // Act
    const result = service.calculate(op1, op2, '*');

    // Assert
    expect(result).toBe(expected);
  });

  it('calculate() should multiply the two operands with "×"', () => {
    // Arrange
    const op1 = '3';
    const op2 = '4';
    const expected = '12';

    // Act
    const result = service.calculate(op1, op2, '×');

    // Assert
    expect(result).toBe(expected);
  });

  it('calculate() should multiply the two operands with "✕"', () => {
    // Arrange
    const op1 = '3';
    const op2 = '4';
    const expected = '12';

    // Act
    const result = service.calculate(op1, op2, '✕');

    // Assert
    expect(result).toBe(expected);
  });

  it('calculate() should divide the two operands with "/"', () => {
    // Arrange
    const op1 = '3';
    const op2 = '4';
    const expected = '0.75';

    // Act
    const result = service.calculate(op1, op2, '/');

    // Assert
    expect(result).toBe(expected);
  });
  
  it('calculate() should divide the two operands with "÷"', () => {
    // Arrange
    const op1 = '3';
    const op2 = '4';
    const expected = '0.75';

    // Act
    const result = service.calculate(op1, op2, '÷');

    // Assert
    expect(result).toBe(expected);
  });
});
