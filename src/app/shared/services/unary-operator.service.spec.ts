import { TestBed } from '@angular/core/testing';
import { UnaryCalcOperator } from '../models/unary-operator.type';
import { UnaryOperatorService } from './unary-operator.service';

describe('UnaryOperatorService', () => {
  let service: UnaryOperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnaryOperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('percentage (%) operator should work', () => {
    // Arrange
    const operand = "12";
    const oper: UnaryCalcOperator = '%';
    const expeted = "0.12";

    // Act
    const actual = service.unaryOperate(operand, oper);

    // Assert
    expect(actual).toBe(expeted);
  });

  it('negate (±) operator should convert positive to negative', () => {
    // Arrange
    const operand = "12";
    const oper: UnaryCalcOperator = '±';
    const expeted = "-12";

    // Act
    const actual = service.unaryOperate(operand, oper);

    // Assert
    expect(actual).toBe(expeted);
  });

  it('negate (±) operator should convert negative to positive', () => {
    // Arrange
    const operand = "-12";
    const oper: UnaryCalcOperator = '±';
    const expeted = "12";

    // Act
    const actual = service.unaryOperate(operand, oper);

    // Assert
    expect(actual).toBe(expeted);
  });

  it('squareRoot (√) operator should work', () => {
    // Arrange
    const operand = "16";
    const oper: UnaryCalcOperator = '√';
    const expeted = "4";

    // Act
    const actual = service.unaryOperate(operand, oper);

    // Assert
    expect(actual).toBe(expeted);
  });
  
  it('should return "0", given "0"', () => {
    // Arrange
    const zero = "0";

    // Act
    const negateActual = service.unaryOperate(zero, '±');
    const percentageActual = service.unaryOperate(zero, '%');
    const squarerootActual = service.unaryOperate(zero, '√');

    // Assert
    expect(negateActual).toBe(zero);
    expect(percentageActual).toBe(zero);
    expect(squarerootActual).toBe(zero);
  });
  
  it('should return "0", given "0.0"', () => {
    // Arrange
    const floatZero = "0.0";
    const zero = "0";

    // Act
    const negateActual = service.unaryOperate(floatZero, '±');
    const percentageActual = service.unaryOperate(floatZero, '%');
    const squarerootActual = service.unaryOperate(floatZero, '√');

    // Assert
    expect(negateActual).toBe(zero);
    expect(percentageActual).toBe(zero);
    expect(squarerootActual).toBe(zero);
  });
});
