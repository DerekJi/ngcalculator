import { CalcState } from "../models/calc-state.model";
import { FsmState } from "../models/fsm-state.enum";
import { patch } from "./immutable.helper";

describe('Immutable Helper', () => {
  it('should accept new values', () => {
    // Arrange
    const initialState: CalcState = {
      state: FsmState.OnOp1,
      operand1: '13',
      operand2: '24',
      operator: '+',
      memory: '',
      result: '',
    };
    const memory = 'test memony content';
    const calcResult = 'any calc result';

    // Act
    const result = patch(initialState, {
      memory: memory,
      result: calcResult
    });

    // Assert - changed parts
    expect(result.memory).toBe(memory);
    expect(result.result).toBe(calcResult);

    // Assert - untouched parts
    expect(result.state).toBe(initialState.state);
    expect(result.operand1).toBe(initialState.operand1);
    expect(result.operand2).toBe(initialState.operand2);
    expect(result.operator).toBe(initialState.operator);
  });
});
