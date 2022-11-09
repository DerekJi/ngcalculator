import { memoryOperate } from "./memory-operator.helper";

describe('Memory Operator Helper', () => {
  it('memoryOperate() should add values with M+', () => {
    // Arrange
    const memory = '34';
    const operand = '48';
    const oper = 'M+';
    const expected = '82';

    // Act
    const result = memoryOperate(memory, operand, oper);

    // Assert 
    expect(result).toBe(expected);
  });

  it('memoryOperate() should add values with M-', () => {
    // Arrange
    const memory = '34';
    const operand = '48';
    const oper = 'M-';
    const expected = '-14';

    // Act
    const result = memoryOperate(memory, operand, oper);

    // Assert 
    expect(result).toBe(expected);
  });

  it('memoryOperate() should return zero with MC', () => {
    // Arrange
    const memory = '34'; // will be ignored
    const operand = '48'; // will be ignored
    const oper = 'MC';
    const expected = '0';

    // Act
    const result = memoryOperate(memory, operand, oper);

    // Assert 
    expect(result).toBe(expected);
  });

  it('memoryOperate() should overwrite with the operand value with MS', () => {
    // Arrange
    const memory = '34'; // will be ignored
    const operand = '48';
    const oper = 'MS';
    const expected = operand;

    // Act
    const result = memoryOperate(memory, operand, oper);

    // Assert 
    expect(result).toBe(expected);
  });
});
