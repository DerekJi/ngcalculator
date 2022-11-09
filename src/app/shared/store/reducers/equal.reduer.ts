import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { patch } from "../../helpers/immutable.helper";
import { BinaryCalcOperator } from "../../models/binary-operator.type";
import { OperandService } from "../../services/operand.service";
import { initialState } from "../calculator.reducers";

const operandService = new OperandService();

export function onEqualReducer(calcState: CalcState): CalcState {
  const divisions: Array<BinaryCalcOperator | undefined> = [ '/', '÷' ];
  if (divisions.includes(calcState.operator) && parseFloat(calcState.operand2) === 0) {
    return patch(initialState, {
      state: FsmState.OnError,
      memory: calcState.memory,
    });
  }

  return patch(initialState, {
    state: FsmState.OnResult,
    memory: calcState.memory,
    result: operandService.calculate(calcState.operand1, calcState.operand2, calcState.operator)
  });
}