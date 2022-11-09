import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { patch } from "../../helpers/immutable.helper";
import { initialState } from "../calculator.reducers";
import { onBackspaceReducer } from "./backspace.reducer";

describe('backspace.reducer', () => {

  it('should update operand1, when OnOp1', () => {
    // Arrange
    const curState: CalcState = patch(initialState, {
      state: FsmState.OnOp1,
      operand1: '1234',
    });

    // Act
    const after = onBackspaceReducer(curState);

    // Assert
    expect(after.state).toBe(FsmState.OnOp1);
    expect(after.operand1).not.toBe(curState.operand1);
    expect(after.operand1).toBe('123');
  });

  it('should update operand2, when OnOp2', () => {
    // Arrange
    const curState: CalcState = patch(initialState, {
      state: FsmState.OnOp2,
      operand2: '2345',
    });

    // Act
    const after = onBackspaceReducer(curState);

    // Assert
    expect(after.state).toBe(FsmState.OnOp2);
    expect(after.operand2).not.toBe(curState.operand2);
    expect(after.operand2).toBe('234');
  });

  it('should do nothing, when OnOperator', () => {
    shouldDoNothingOnState(FsmState.OnOperator);
    shouldDoNothingOnState(FsmState.OnStart);
    shouldDoNothingOnState(FsmState.OnError);
    shouldDoNothingOnState(FsmState.OnResult);
    shouldDoNothingOnState(FsmState.PoweredOff);
    shouldDoNothingOnState(FsmState.OnOp1Result);
    shouldDoNothingOnState(FsmState.OnOp2Result);
    
  });

  function shouldDoNothingOnState(state: FsmState) {
    // Arrange
    const curState: CalcState = {
      state,
      operand1: '1234',
      operand2: '2345',
      operator: '+',
      memory: 'some memory content',
      result: 'some result content',
    };

    // Act
    const after = onBackspaceReducer(curState);

    // Assert
    expect(after.state).toBe(state);
    expect(after.operand1).toBe(curState.operand1);
    expect(after.operand2).toBe(curState.operand2);
    expect(after.operator).toBe(curState.operator);
    expect(after.memory).toBe(curState.memory);
    expect(after.result).toBe(curState.result);
  }
});