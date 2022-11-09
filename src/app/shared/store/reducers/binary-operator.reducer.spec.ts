import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { patch } from "../../helpers/immutable.helper";
import { BinaryCalcOperator } from "../../models/binary-operator.type";
import { initialState } from "../calculator.reducers";
import { onBinaryOperatorReducer } from "./binary-operator.reducer";

describe('binary-operator.reducer', () => {
  let binaryOperators: BinaryCalcOperator[] = [ '+', '-', '*', '/', '÷', '×', '✕' ];

  function shouldResetOperand2(state: FsmState, oper: BinaryCalcOperator) {
    // Arrange
    const curState = patch(initialState, {
      state,
      operand1: 'some operand (1)',
      operand2: 'some operand (2)',
      operator: oper,
    });

    // Act
    const after = onBinaryOperatorReducer(curState, { oper })

    // Assert
    expect(after.state).toBe(FsmState.OnOperator);
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(initialState.operand2);
    expect(after.operator).toBe(oper);
  }

  it('should reset Operand2 & not chagne Operand1, when OnStart/OnOp1/OnOp1Result/OnOperator', () => {
    [ FsmState.OnStart, FsmState.OnOp1, FsmState.OnOp1Result, FsmState.OnOperator ].forEach(state => {
      binaryOperators.forEach(oper => {
        shouldResetOperand2(state, oper);
      });
    });
  });

  function shouldCalculate(state: FsmState, 
    operand1: number,
    operand2: number,
    oper: BinaryCalcOperator,
    expectedResult: string) {
    // Arrange
    const expectedState = FsmState.OnOperator;
    const curState: CalcState = patch(initialState, {
      state,
      operand1: operand1.toString(),
      operand2: operand2.toString(),
      operator: oper,
      result: '',
    });

    // Act
    const after = onBinaryOperatorReducer(curState, { oper });

    // Assert
    expect(after.state).toBe(expectedState);
    expect(after.operator).toBe(oper);
    expect(after.operand1).toBe(expectedResult);
    expect(after.operand2).toBe(initialState.operand2);
  }

  it('should calculate & store result into Operand1 & reset Operand2, when OnOp2/OnOp2Result', () => {
    [ FsmState.OnOp2, FsmState.OnOp2 ].forEach(state => {
      shouldCalculate(state, 6, 3, '+', '9');
      shouldCalculate(state, 6, 3, '-', '3');
      shouldCalculate(state, 6, 3, '*', '18');
      shouldCalculate(state, 6, 3, '/', '2');
    });
  });
  
  function shouldAssignResultToOperand1(state: FsmState, oper: BinaryCalcOperator) {
    // Arrange
    const curState = patch(initialState, {
      state,
      result: "some result",
      operator: '✕',
      operand1: 'some operand 1',
      operand2: 'some operand 2',
    });

    // Act
    const after = onBinaryOperatorReducer(curState, { oper });

    // Assert
    expect(after.state).toBe(FsmState.OnOperator);
    expect(after.operand1).toBe(curState.result);
    expect(after.operator).toBe(oper);
    expect(after.operand2).toBe(initialState.operand2);
  }

  it('should transit to OnOperator & assign result to Operand1 & reset Operand2 when OnResult', () => {
    binaryOperators.forEach(oper => {
      shouldAssignResultToOperand1(FsmState.OnResult, oper);
    });
  });
  
  function shouldDoNothing(state: FsmState, oper: BinaryCalcOperator) {
    // Arrange
    const curState = patch(initialState, {
      state,
      operand1: 'some operand (1)',
      operand2: 'some operand (2)',
      operator: oper,
    });

    // Act
    const after = onBinaryOperatorReducer(curState, { oper })

    // Assert
    expect(after.state).toBe(curState.state);
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
  }

  it('should do nothing, when OnError/PoweredOff', () => {
    [ FsmState.OnError, FsmState.PoweredOff ].forEach(state => {
      binaryOperators.forEach(oper => {
        shouldDoNothing(state, oper);
      });
    });
  });
});