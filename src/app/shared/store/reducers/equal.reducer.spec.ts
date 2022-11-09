import { patch } from "../../helpers/immutable.helper";
import { BinaryCalcOperator } from "../../models/binary-operator.type";
import { CalcState } from "../../models/calc-state.model";
import { FsmState } from "../../models/fsm-state.enum";
import { initialState } from "../calculator.reducers";
import { onEqualReducer } from "./equal.reduer";

describe('equal.reducer', () => {
  let testState: CalcState = {
    state: FsmState.OnOp2,
    operand1: '6',
    operand2: '3',
    operator: undefined,
    memory: 'some memory content',
    result: 'invalid result',
  };

  function shouldCalculate(oper: BinaryCalcOperator, expectedResult: string) {
    // Arrange
    const curState = patch(testState, {
      operator: oper,
    });

    // Act
    const after = onEqualReducer(curState);

    // Assert - state should be OnResult
    expect(after.state).toBe(FsmState.OnResult);
    
    // Assert - memory should not be reset
    expect(after.memory).not.toBe(initialState.memory);
    expect(after.memory).toBe(testState.memory);
    
    // Assert - result should be correct
    expect(after.result).not.toBe(testState.result);
    expect(after.result).toBe(expectedResult);

    // Assert - Operand1 should be reset
    expect(after.operand1).not.toBe(curState.operand1);
    expect(after.operand1).toBe(initialState.operand1);

    // Assert - Operand2 should be reset
    expect(after.operand2).not.toBe(curState.operand2);
    expect(after.operand2).toBe(initialState.operand2);

    // Assert - Operator should be reset
    expect(after.operator).not.toBe(curState.operator);
    expect(after.operator).toBe(initialState.operator);
  }

  it('should store calc result & remain memory & reset operands/operator', () => {
    shouldCalculate('+', '9');
    shouldCalculate('-', '3');
    shouldCalculate('*', '18');
    shouldCalculate('×', '18');
    shouldCalculate('✕', '18');
    shouldCalculate('/', '2');
    shouldCalculate('÷', '2');
  });

  function shouldTransitToErrorForDevisionByZero(oper: BinaryCalcOperator, operand2: string) {
    // Assert
    const divisionState = patch(testState, {
      operator: oper,
      operand2,
    });

    // Act
    const after = onEqualReducer(divisionState);

    // Assert - state must be Error
    expect(after.state).toBe(FsmState.OnError);
    
    // Assert - remain memory
    expect(after.memory).not.toBe(initialState.memory);
    expect(after.memory).toBe(divisionState.memory);
    
    // Assert - result should be reset
    expect(after.result).not.toBe(testState.result);
    expect(after.result).toBe(initialState.result);

    // Assert - Operand1 should be reset
    expect(after.operand1).not.toBe(divisionState.operand1);
    expect(after.operand1).toBe(initialState.operand1);

    // Assert - Operand2 should be reset
    expect(after.operand2).toBe(initialState.operand2);

    // Assert - Operator should be reset
    expect(after.operator).not.toBe(divisionState.operator);
    expect(after.operator).toBe(initialState.operator);
  }

  it ('should transit to Error in case of devision by zero', () => {
    shouldTransitToErrorForDevisionByZero('/', '0');
    shouldTransitToErrorForDevisionByZero('/', '0.0');
    shouldTransitToErrorForDevisionByZero('/', '-0.0');
    shouldTransitToErrorForDevisionByZero('÷', '0');
    shouldTransitToErrorForDevisionByZero('÷', '0.0');
    shouldTransitToErrorForDevisionByZero('÷', '-0.0');
  });
});