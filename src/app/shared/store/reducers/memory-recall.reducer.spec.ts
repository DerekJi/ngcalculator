import { patch } from "../../helpers/immutable.helper";
import { CalcState } from "../../models/calc-state.model";
import { FsmState } from "../../models/fsm-state.enum";
import { onMemoryRecallReducer } from "./memory-recall.reducer";

describe('memory-recall.reducer', () => {
  let testState: CalcState = {
    state: FsmState.OnOp2,
    operand1: '6',
    operand2: '3',
    operator: '+',
    memory: 'some memory content',
    result: 'invalid result',
  };
  
  function shouldDoNothing(state: FsmState) {
    // Arrange
    const curState = patch(testState, { state });

    // Act
    const after = onMemoryRecallReducer(curState);

    // Assert - everything not changed
    expect(after.state).toBe(curState.state);
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }

  it('should do nothing, when OnError', () => {
    shouldDoNothing(FsmState.OnError);
  });

  it('should do nothing, when PoweredOff', () => {
    shouldDoNothing(FsmState.PoweredOff);
  });

  function shouldAssignMemoryToOperand2(state: FsmState) {
    // Arrange
    const curState = patch(testState, { state });

    // Act
    const after = onMemoryRecallReducer(curState);

    // Assert - transit to OnOp2Result
    expect(after.state).toBe(FsmState.OnOp2Result);

    // Assert - assign memory to Operand2
    expect(after.operand2).toBe(curState.memory);

    // Assert - remain others
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }

  it('should assign memory to Oprand2 & transit to OnOp2Result, when OnOp2', () => {
    shouldAssignMemoryToOperand2(FsmState.OnOp2);
  });

  it('should assign memory to Oprand2 & transit to OnOp2Result, when OnOp2Result', () => {
    shouldAssignMemoryToOperand2(FsmState.OnOp2Result);
  });

  it('should assign memory to Oprand2 & transit to OnOp2Result, when OnOperator', () => {
    shouldAssignMemoryToOperand2(FsmState.OnOperator);
  });
  
  function shouldAssignMemoryToOperand1(state: FsmState) {
    // Arrange
    const curState = patch(testState, { state });

    // Act
    const after = onMemoryRecallReducer(curState);

    // Assert - transit to OnOp1Result
    expect(after.state).toBe(FsmState.OnOp1Result);

    // Assert - assign memory to Operand1
    expect(after.operand1).not.toBe(curState.operand1);
    expect(after.operand1).toBe(curState.memory);

    // Assert - remain others
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }

  it('should assign memory to Oprand1 & transit to OnOp1Result, when OnOp1', () => {
    shouldAssignMemoryToOperand1(FsmState.OnOp1);
  });

  it('should assign memory to Oprand1 & transit to OnOp1Result, when OnOp1Result', () => {
    shouldAssignMemoryToOperand1(FsmState.OnOp1Result);
  });

  it('should assign memory to Oprand1 & transit to OnOp1Result, when OnStart', () => {
    shouldAssignMemoryToOperand1(FsmState.OnStart);
  });

  it('should assign memory to Oprand1 & transit to OnOp1Result, when OnResult', () => {
    shouldAssignMemoryToOperand1(FsmState.OnResult);
  });
});