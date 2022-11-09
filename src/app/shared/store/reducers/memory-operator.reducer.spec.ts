import { patch } from "../../helpers/immutable.helper";
import { CalcState } from "../../models/calc-state.model";
import { FsmState } from "../../models/fsm-state.enum";
import { MemoryOperator } from "../../models/memory-operator.type";
import { onMemoryOperatorReducer } from "./memory-operator.reducer";

describe('memory-operator.reducer', () => {
  let testState: CalcState = {
    state: FsmState.OnOp2,
    operand1: '6',
    operand2: '3',
    operator: '+',
    memory: 'some memory content',
    result: 'invalid result',
  };
  let operaotrs: MemoryOperator[] = [ 'M+', 'M-', 'MC', 'MS' ];
  
  function shouldDoNothing(state: FsmState, oper: MemoryOperator) {
    // Arrange
    const curState = patch(testState, { state });

    // Act
    const after = onMemoryOperatorReducer(curState, { oper });

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

  function shouldCalcMemoryWithOperand1(state: FsmState, oper: MemoryOperator, 
    nowMemeory: string,
    nowOperand1: string,
    expectedMemory: string) {
    // Arrange
    const curState = patch(testState, {
      state,
      operand1: nowOperand1,
      memory: nowMemeory
    });

    // Act
    const after = onMemoryOperatorReducer(curState, { oper });

    // Assert - state should be OnOp1Result
    expect(after.state).toBe(FsmState.OnOp1Result);

    // Assert - calculated memory
    expect(after.memory).toBe(expectedMemory);

    // Assert - remain others
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.result).toBe(curState.result);
  }

  it('should calc memory with Operand1 & transit to OnOp1Result, when OnOp1', () => {
    shouldCalcMemoryWithOperand1(FsmState.OnOp1, 'M+', '10', '3', '13');
    shouldCalcMemoryWithOperand1(FsmState.OnOp1, 'M-', '10', '3', '7');
    shouldCalcMemoryWithOperand1(FsmState.OnOp1, 'MC', '10', '3', '0');
    shouldCalcMemoryWithOperand1(FsmState.OnOp1, 'MS', '10', '3', '3');
  });

  it('should calc memory with Operand1 & transit to OnOp1Result, when OnOp1Result', () => {
    shouldCalcMemoryWithOperand1(FsmState.OnOp1Result, 'M+', '10', '3', '13');
    shouldCalcMemoryWithOperand1(FsmState.OnOp1Result, 'M-', '10', '3', '7');
    shouldCalcMemoryWithOperand1(FsmState.OnOp1Result, 'MC', '10', '3', '0');
    shouldCalcMemoryWithOperand1(FsmState.OnOp1Result, 'MS', '10', '3', '3');
  });

  it('should calc memory with Operand1 & transit to OnOp1Result, when OnStart', () => {
    shouldCalcMemoryWithOperand1(FsmState.OnStart, 'M+', '10', '3', '13');
    shouldCalcMemoryWithOperand1(FsmState.OnStart, 'M-', '10', '3', '7');
    shouldCalcMemoryWithOperand1(FsmState.OnStart, 'MC', '10', '3', '0');
    shouldCalcMemoryWithOperand1(FsmState.OnStart, 'MS', '10', '3', '3');
  });

  it('should calc memory with Operand1 & transit to OnOp1Result, when OnOperator', () => {
    shouldCalcMemoryWithOperand1(FsmState.OnOperator, 'M+', '10', '3', '13');
    shouldCalcMemoryWithOperand1(FsmState.OnOperator, 'M-', '10', '3', '7');
    shouldCalcMemoryWithOperand1(FsmState.OnOperator, 'MC', '10', '3', '0');
    shouldCalcMemoryWithOperand1(FsmState.OnOperator, 'MS', '10', '3', '3');
  });  

  function shouldCalcMemoryWithOperand2(state: FsmState, oper: MemoryOperator, 
    nowMemeory: string,
    nowOperand2: string,
    expectedMemory: string) {
    // Arrange
    const curState = patch(testState, {
      state,
      operand2: nowOperand2,
      memory: nowMemeory
    });

    // Act
    const after = onMemoryOperatorReducer(curState, { oper });

    // Assert - state should be OnOp1Result
    expect(after.state).toBe(FsmState.OnOp2Result);

    // Assert - calculated memory
    expect(after.memory).toBe(expectedMemory);

    // Assert - remain others
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.result).toBe(curState.result);
  }  

  it('should calc memory with Operand2 & transit to OnOp2Result, when OnOp2', () => {
    shouldCalcMemoryWithOperand2(FsmState.OnOp2, 'M+', '10', '3', '13');
    shouldCalcMemoryWithOperand2(FsmState.OnOp2, 'M-', '10', '3', '7');
    shouldCalcMemoryWithOperand2(FsmState.OnOp2, 'MC', '10', '3', '0');
    shouldCalcMemoryWithOperand2(FsmState.OnOp2, 'MS', '10', '3', '3');
  });

  it('should calc memory with Operand2 & transit to OnOp2Result, when OnOp2Result', () => {
    shouldCalcMemoryWithOperand2(FsmState.OnOp2Result, 'M+', '10', '3', '13');
    shouldCalcMemoryWithOperand2(FsmState.OnOp2Result, 'M-', '10', '3', '7');
    shouldCalcMemoryWithOperand2(FsmState.OnOp2Result, 'MC', '10', '3', '0');
    shouldCalcMemoryWithOperand2(FsmState.OnOp2Result, 'MS', '10', '3', '3');
  });
  
  function shouldCalcMemoryWithResult(state: FsmState, oper: MemoryOperator, 
    nowMemeory: string,
    nowResult: string,
    expectedMemory: string) {
    // Arrange
    const curState = patch(testState, {
      state,
      result: nowResult,
      memory: nowMemeory
    });

    // Act
    const after = onMemoryOperatorReducer(curState, { oper });

    // Assert - state should be OnOp1Result
    expect(after.state).toBe(FsmState.OnOp1Result);

    // Assert - calculated memory
    expect(after.memory).toBe(expectedMemory);

    // Assert - assign result to Oprand1
    expect(after.operand1).toBe(curState.result);

    // Assert - remain others
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.result).toBe(curState.result);
  }  

  it('should calc memory with Operand2 & transit to OnOp1Result, when OnResult', () => {
    shouldCalcMemoryWithResult(FsmState.OnResult, 'M+', '10', '3', '13');
    shouldCalcMemoryWithResult(FsmState.OnResult, 'M-', '10', '3', '7');
    shouldCalcMemoryWithResult(FsmState.OnResult, 'MC', '10', '3', '0');
    shouldCalcMemoryWithResult(FsmState.OnResult, 'MS', '10', '3', '3');
  });
});