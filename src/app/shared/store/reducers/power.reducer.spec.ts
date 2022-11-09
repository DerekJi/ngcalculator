import { patch } from "../../helpers/immutable.helper";
import { CalcState } from "../../models/calc-state.model";
import { FsmState } from "../../models/fsm-state.enum";
import { initialState } from "../calculator.reducers";
import { onPowerReducer } from "./power.reducer";

describe('power.reducer', () => {
  let testState: CalcState = {
    state: FsmState.OnOp2,
    operand1: 'operand 1',
    operand2: 'operand 2',
    operator: '+',
    memory: 'some memory content',
    result: 'invalid result',
  };

  function shouldResetAllAndPowerOff(state: FsmState) {
    // Arrange
    const curState = patch(testState, {
      state
    });

    // Act
    const after = onPowerReducer(curState);

    // Assert
    expect(after.state).toBe(FsmState.PoweredOff);

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
  }
  
  it('should be powered off & reset everything else', () => {
    shouldResetAllAndPowerOff(FsmState.OnError);
  });

  it('should be OnStart & reset everything', () => {
    // Arrange
    const curState = patch(testState, {
      state: FsmState.PoweredOff
    });

    // Act
    const after = onPowerReducer(curState);

    // Assert
    expect(after.state).toBe(FsmState.OnStart);

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

});