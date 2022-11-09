import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CalcState } from "../models/calc-state.model";
import { FsmState } from "../models/fsm-state.enum";

export const selectRoot = createFeatureSelector<CalcState>('calc');

export const selectFsmState = createSelector(selectRoot, (root) => root.state);

export const selectOperand1 = createSelector(selectRoot, (root) => root.operand1);

export const selectOperand2 = createSelector(selectRoot, (root) => root.operand2);

export const selectOperator = createSelector(selectRoot, (root) => root.operator);

export const selectMemory = createSelector(selectRoot, (root) => root.memory);

export const selectResult = createSelector(selectRoot, (root) => root.result);

export const selectOperand = createSelector(selectFsmState, selectOperand1, selectOperand2, selectResult, selectMemory, 
  (fsmState, op1, op2, result, memory) => {
    switch (fsmState) {
      case FsmState.OnError:
        return "Error";
      case FsmState.OnResult:
        return result;
      case FsmState.OnStart:
      case FsmState.OnOp1:
      case FsmState.OnOp1Result:
      case FsmState.OnOperator:
        return op1;
      case FsmState.OnOp2:
      case FsmState.OnOp2Result:
        return op2;
      case FsmState.PoweredOff:
          return "";
    }
});
