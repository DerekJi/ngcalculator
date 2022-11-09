import { patch } from "../../helpers/immutable.helper";
import { CalcState } from "../../models/calc-state.model";
import { FsmState } from "../../models/fsm-state.enum";
import { initialState } from "../calculator.reducers";
import { onPointReducer } from "./point.reduer";

describe('point.reducer', () => {
  let testState: CalcState = {
    state: FsmState.OnOp2,
    operand1: '6',
    operand2: '3',
    operator: '+',
    memory: 'some memory content',
    result: 'invalid result',
  };

  function shouldInitializeOperand1(state: FsmState) {
    // Arrange
    const curState = patch(testState, { state });

    // Act
    const after = onPointReducer(curState);

    // Assert
    expect(after.state).toBe(FsmState.OnOp1);

    expect(after.operand1).not.toBe(testState.operand1);
    expect(after.operand1).not.toBe(initialState.operand1);
    expect(after.operand1).toBe('0.');

    expect(after.memory).not.toBe(initialState.memory);
    expect(after.memory).toBe(curState.memory);
  }
  
  it('should initialize Operand1 as "0.", when OnError/OnResult/OnStart', () => {
    [ FsmState.OnError, FsmState.OnResult, FsmState.OnStart ].forEach((state) => {
      shouldInitializeOperand1(state);
    });
  });

  it('should initialize Operand2 as "0.", when OnOperator', () => {
      // Arrange
    const curState = patch(testState, { state: FsmState.OnOperator });

    // Act
    const after = onPointReducer(curState);

    // Assert
    expect(after.state).toBe(FsmState.OnOp2);

    expect(after.operand2).not.toBe(testState.operand2);
    expect(after.operand2).not.toBe(initialState.operand2);
    expect(after.operand2).toBe('0.');

    expect(after.memory).not.toBe(initialState.memory);
    expect(after.memory).toBe(curState.memory);
  });

  function shouldAppendPointToOperand1(beforeOperand: string, expected: string) {
    // Arrange
    const curState = patch(testState, {
      state: FsmState.OnOp1,
      operand1: beforeOperand,
    });

    // Act
    const after = onPointReducer(curState);

    // Assert
    expect(after.state).toBe(curState.state); // no change on state
    expect(after.operand1).toBe(expected);

    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }
  
  it('should append Point to Operand1, when OnOp1', () => {
    shouldAppendPointToOperand1('1', '1.');
    shouldAppendPointToOperand1('2.', '2.');
    shouldAppendPointToOperand1('3.1', '3.1');
    shouldAppendPointToOperand1('4.0', '4.0');
  });

  function shouldAppendPointToOperand2(beforeOperand: string, expected: string) {
    // Arrange
    const curState = patch(testState, {
      state: FsmState.OnOp2,
      operand2: beforeOperand,
    });

    // Act
    const after = onPointReducer(curState);

    // Assert
    expect(after.state).toBe(curState.state); // no change on state
    expect(after.operand2).toBe(expected);

    expect(after.operand1).toBe(curState.operand1);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }
  
  it('should append Point to Operand2, when OnOp2', () => {
    shouldAppendPointToOperand2('1', '1.');
    shouldAppendPointToOperand2('2.', '2.');
    shouldAppendPointToOperand2('3.1', '3.1');
    shouldAppendPointToOperand2('4.0', '4.0');
  });
  
  function shouldDoNothing(state: FsmState) {
    // Arrange
    const curState = patch(testState, { state });

    // Act
    const after = onPointReducer(curState);

    // Assert - everything not changed
    expect(after.state).toBe(curState.state);
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }
  
  it('should do nothing, when OnOp1Result/OnOp2Result/PoweredOff', () => {
    shouldDoNothing(FsmState.PoweredOff);
    shouldDoNothing(FsmState.OnOp1Result);
    shouldDoNothing(FsmState.OnOp2Result);
  });
});