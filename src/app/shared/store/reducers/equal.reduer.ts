import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { OperandService } from "../../services/operand.service";
import { initialState } from "../calculator.reducers";

const operandService = new OperandService();

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
    result: operandService.calculate(calcState.operand1, calcState.operand2, calcState.operator)
  });
}