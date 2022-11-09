import { patch } from "../../helpers/immutable.helper";
import { CalcState } from "../../models/calc-state.model";
import { FsmState } from "../../models/fsm-state.enum";
import { UnaryCalcOperator } from "../../models/unary-operator.type";
import { onUnaryOperatorReducer } from "./unary-operator.reducer";

describe('memory-operator.reducer', () => {
  let testState: CalcState = {
    state: FsmState.OnOp2,
    operand1: '6',
    operand2: '3',
    operator: '+',
    memory: 'some memory content',
    result: 'invalid result',
  };
  let operaotrs: UnaryCalcOperator[] = [ '%', '±', '∓', '√' ];

  function shouldCalcOperand1(state: FsmState, oper: UnaryCalcOperator,
    nowValue: string, expected: string) {
    // Arrange
    const curState = patch(testState, { 
      state,
      operand1: nowValue,
    });

    // Act
    const after = onUnaryOperatorReducer(curState, { oper });
    
    // Assert - state should be OnOp1Result
    expect(after.state).toBe(FsmState.OnOp1Result);
    
    // Assert - operand1
    expect(after.operand1).toBe(expected);

    // Assert - remain others    
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }

  it('should calc Operand1 & transit to OnOp1Result, when OnOp1', () => {
    shouldCalcOperand1(FsmState.OnOp1, '%', '9', '0.09');
    shouldCalcOperand1(FsmState.OnOp1, '√', '9', '3');
    shouldCalcOperand1(FsmState.OnOp1, '±', '9', '-9');
    shouldCalcOperand1(FsmState.OnOp1, '∓', '-9', '9');
  });

  it('should calc Operand1 & transit to OnOp1Result, when OnOp1Result', () => {
    shouldCalcOperand1(FsmState.OnOp1Result, '%', '9', '0.09');
    shouldCalcOperand1(FsmState.OnOp1Result, '√', '9', '3');
    shouldCalcOperand1(FsmState.OnOp1Result, '±', '9', '-9');
    shouldCalcOperand1(FsmState.OnOp1Result, '∓', '-9', '9');
  });

  function shouldCalcOperand2(state: FsmState, oper: UnaryCalcOperator,
    nowValue: string, expected: string) {
    // Arrange
    const curState = patch(testState, { 
      state,
      operand2: nowValue,
    });

    // Act
    const after = onUnaryOperatorReducer(curState, { oper });
    
    // Assert - state should be OnOp2Result
    expect(after.state).toBe(FsmState.OnOp2Result);
    
    // Assert - operand1
    expect(after.operand2).toBe(expected);

    // Assert - remain others    
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }

  it('should calc Operand2 & transit to OnOp2Result, when OnOp2', () => {
    shouldCalcOperand2(FsmState.OnOp2, '%', '9', '0.09');
    shouldCalcOperand2(FsmState.OnOp2, '√', '9', '3');
    shouldCalcOperand2(FsmState.OnOp2, '±', '9', '-9');
    shouldCalcOperand2(FsmState.OnOp2, '∓', '-9', '9');
  });

  it('should calc Operand2 & transit to OnOp2Result, when OnOp2Result', () => {
    shouldCalcOperand2(FsmState.OnOp2Result, '%', '9', '0.09');
    shouldCalcOperand2(FsmState.OnOp2Result, '√', '9', '3');
    shouldCalcOperand2(FsmState.OnOp2Result, '±', '9', '-9');
    shouldCalcOperand2(FsmState.OnOp2Result, '∓', '-9', '9');
  });
  
  function shouldCalcResult(state: FsmState, oper: UnaryCalcOperator,
    nowValue: string, expected: string) {
    // Arrange
    const curState = patch(testState, { 
      state,
      result: nowValue,
    });

    // Act
    const after = onUnaryOperatorReducer(curState, { oper });
    
    // Assert - state should be OnResult
    expect(after.state).toBe(FsmState.OnResult);
    
    // Assert - operand1
    expect(after.result).toBe(expected);

    // Assert - remain others    
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
  }

  it('should calc result & transit to OnResult, when OnResult', () => {
    shouldCalcResult(FsmState.OnResult, '%', '9', '0.09');
    shouldCalcResult(FsmState.OnResult, '√', '9', '3');
    shouldCalcResult(FsmState.OnResult, '±', '9', '-9');
    shouldCalcResult(FsmState.OnResult, '∓', '-9', '9');
  });

  function shouldDoNothing(state: FsmState, oper: UnaryCalcOperator) {
    // Arrange
    const curState = patch(testState, { state });

    // Act
    const after = onUnaryOperatorReducer(curState, { oper });

    // Assert - everything not changed
    expect(after.state).toBe(curState.state);
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }

  it('should do nothing, when OnError', () => {
    operaotrs.forEach(oper => {
      shouldDoNothing(FsmState.OnError, oper);
    });
  });

  it('should do nothing, when PoweredOff', () => {
    operaotrs.forEach(oper => {
      shouldDoNothing(FsmState.PoweredOff, oper);
    });
  });
  
  it('should do nothing, when OnStart', () => {
    operaotrs.forEach(oper => {
      shouldDoNothing(FsmState.OnStart, oper);
    });
  });

  it('should do nothing, when OnOperator', () => {
    operaotrs.forEach(oper => {
      shouldDoNothing(FsmState.OnOperator, oper);
    });
  });
});