import { patch } from "../../helpers/immutable.helper";
import { CalcState } from "../../models/calc-state.model";
import { FsmState } from "../../models/fsm-state.enum";
import { initialState } from "../calculator.reducers";
import { onTypeNumberReducer } from "./number.reducer";

describe('number.reducer', () => {
  let testState: CalcState = {
    state: FsmState.OnOp2,
    operand1: '6',
    operand2: '3',
    operator: '+',
    memory: 'some memory content',
    result: 'invalid result',
  };
  let numbers: Number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  
  it('should do nothing, when PoweredOff', () => {
    numbers.forEach(num => {
      // Arrange
      const curState = patch(testState, { state: FsmState.PoweredOff });

      // Act
      const after = onTypeNumberReducer(curState, { num });

      // Assert - everything not changed
      expect(after.state).toBe(curState.state);
      expect(after.operand1).toBe(curState.operand1);
      expect(after.operand2).toBe(curState.operand2);
      expect(after.operator).toBe(curState.operator);
      expect(after.memory).toBe(curState.memory);
      expect(after.result).toBe(curState.result);
    });
  });

  it('should set Operand1 & transit to OnOp1 & remain others, when OnOp1Result/OnOp2Result', () => {
    numbers.forEach(num => {
      [FsmState.OnOp1Result, FsmState.OnOp2Result].forEach(state => {
        // Arrange
        const curState = patch(testState, { state });
    
        // Act
        const after = onTypeNumberReducer(curState, { num });
  
        // Assert
        expect(after.state).toBe(FsmState.OnOp1);
        expect(after.operand1).toBe(num.toString());
        // Assert - other no changes
        expect(after.operand2).toBe(curState.operand2);
        expect(after.operator).toBe(curState.operator);
        expect(after.memory).toBe(curState.memory);
        expect(after.result).toBe(curState.result);
      });
    });    
  });
  
  it('should set Operand2 & transit to OnOp2 & remain others, when OnOperator', () => {
    numbers.forEach(num => {
        // Arrange
        const curState = patch(testState, { state: FsmState.OnOperator });
    
        // Act
        const after = onTypeNumberReducer(curState, { num });
  
        // Assert
        expect(after.state).toBe(FsmState.OnOp2);
        expect(after.operand2).toBe(num.toString());
        // Assert - other no changes
        expect(after.operand1).toBe(curState.operand1);
        expect(after.operator).toBe(curState.operator);
        expect(after.memory).toBe(curState.memory);
        expect(after.result).toBe(curState.result);
    });    
  });

  it('should set Operand1 & transit to OnOp1 & reset others, when OnError/OnResult', () => {
    numbers.forEach(num => {
      [FsmState.OnError, FsmState.OnResult].forEach(state => {
        // Arrange
        const curState = patch(testState, { state });
    
        // Act
        const after = onTypeNumberReducer(curState, { num });
  
        // Assert
        expect(after.state).toBe(FsmState.OnOp1);
        expect(after.operand1).toBe(num.toString());
        // Assert - remain
        expect(after.memory).toBe(curState.memory);
        // Assert - reset others
        expect(after.operand2).toBe(initialState.operand2);
        expect(after.operator).toBe(initialState.operator);
        expect(after.result).toBe(initialState.result);
      });
    });    
  });
  
  it('should append to Operand1 & transit to OnOp1 & remain others, when OnStart/OnOp1', () => {
    numbers.forEach(num => {
      [FsmState.OnStart, FsmState.OnOp1].forEach(state => {
        // Arrange
        const curState = patch(testState, { state });
    
        // Act
        const after = onTypeNumberReducer(curState, { num });
  
        // Assert
        expect(after.state).toBe(FsmState.OnOp1);
        expect(after.operand1).not.toBe(num.toString());
        expect(after.operand1).toBe(testState.operand1 + num.toString());
        // Assert - remain others
        expect(after.memory).toBe(curState.memory);
        expect(after.operand2).toBe(curState.operand2);
        expect(after.operator).toBe(curState.operator);
        expect(after.result).toBe(curState.result);
      });
    });    
  });
  
  it('should append to Operand1 & transit to OnOp2 & remain others, when OnOp2', () => {
    numbers.forEach(num => {
        // Arrange
        const curState = patch(testState, { state: FsmState.OnOp2 });
    
        // Act
        const after = onTypeNumberReducer(curState, { num });
  
        // Assert
        expect(after.state).toBe(FsmState.OnOp2);
        expect(after.operand2).not.toBe(num.toString());
        expect(after.operand2).toBe(testState.operand2 + num.toString());
        // Assert - remain others
        expect(after.memory).toBe(curState.memory);
        expect(after.operand1).toBe(curState.operand1);
        expect(after.operator).toBe(curState.operator);
        expect(after.result).toBe(curState.result);
    });    
  });
});