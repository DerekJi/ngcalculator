import { CalcState } from "src/app/models/calc-state.model";
import { FsmState } from "src/app/models/fsm-state.enum";
import { initialState } from "../calculator.reducers";
import { calculate } from "../operand.helper";

export function onEqualReducer(calcState: CalcState): CalcState {
  if (calcState.operator === '/' && parseInt(calcState.operand2) === 0) {
    return Object.assign({}, initialState, {
      state: FsmState.OnError,
      memory: calcState.memory,
    });
  }

  return Object.assign({}, initialState, {
    state: FsmState.OnResult,
    memory: calcState.memory,
    result: calculate(calcState.operand1, calcState.operand2, calcState.operator)
  });
}