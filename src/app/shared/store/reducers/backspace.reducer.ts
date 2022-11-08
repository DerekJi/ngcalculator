import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { patch } from "../../helpers/immutable.helper";
import { OperandService } from "../../services/operand.service";

const operandService = new OperandService();

export function onBackspaceReducer(calcState: CalcState): CalcState {
  switch (calcState.state) {
    case FsmState.OnOp1:
      return patch(calcState, {
        state: FsmState.OnOp1,
        operand1: operandService.backspace(calcState.operand1),
      });

    case FsmState.OnOp2:
      return patch(calcState, {
        state: FsmState.OnOp2,
        operand2: operandService.backspace(calcState.operand2),
      });

    case FsmState.OnOperator:
    case FsmState.OnStart:
    case FsmState.OnError:
    case FsmState.OnResult:
    case FsmState.PoweredOff:
    case FsmState.OnOp1Result:
    case FsmState.OnOp2Result:
      return { ...calcState };
  }
}