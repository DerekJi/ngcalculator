import { CalcState } from "../../models/calc-state.model";
import { FsmState } from "../../models/fsm-state.enum";
import { ResetType } from "../../models/reset-type.enum";
import { initialState } from "../calculator.reducers";
import { onResetReduer } from "./reset.reducer";

describe('reset.reducer', () => {
  let testState: CalcState = {
    state: FsmState.OnOp2,
    operand1: '6',
    operand2: '3',
    operator: '+',
    memory: 'some memory content',
    result: 'invalid result',
  };
  let expectedState = FsmState.OnStart;
  
  it('"CE" should reset everything & transit to OnStart', () => {
    // Act
    const after = onResetReduer(testState, { resetType: ResetType.CE });

    // Assert
    expect(after.state).toBe(expectedState);

    expect(after.memory).not.toBe(testState.memory);
    expect(after.memory).toBe(initialState.memory);

    expect(after.operand1).not.toBe(testState.operand1);
    expect(after.operand1).toBe(initialState.operand1);

    expect(after.operand2).not.toBe(testState.operand2);
    expect(after.operand2).toBe(initialState.operand2);

    expect(after.operator).not.toBe(testState.operator);
    expect(after.operator).toBe(initialState.operator);

    expect(after.result).not.toBe(testState.result);
    expect(after.result).toBe(initialState.result);
  });

  it('"C" should reset everything except memory & transit to OnStart', () => {
    // Act
    const after = onResetReduer(testState, { resetType: ResetType.C });

    // Assert
    expect(after.state).toBe(expectedState);

    expect(after.memory).not.toBe(initialState.memory);
    expect(after.memory).toBe(testState.memory);

    expect(after.operand1).not.toBe(testState.operand1);
    expect(after.operand1).toBe(initialState.operand1);

    expect(after.operand2).not.toBe(testState.operand2);
    expect(after.operand2).toBe(initialState.operand2);

    expect(after.operator).not.toBe(testState.operator);
    expect(after.operator).toBe(initialState.operator);

    expect(after.result).not.toBe(testState.result);
    expect(after.result).toBe(initialState.result);
  });

});