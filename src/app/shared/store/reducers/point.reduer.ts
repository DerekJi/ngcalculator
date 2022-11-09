import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { patch } from "../../helpers/immutable.helper";
import { OperandService } from "../../services/operand.service";
import { initialState } from "../calculator.reducers";

const operandService = new OperandService();

export function onPointReducer(calcState: CalcState): CalcState {
  switch (calcState.state) {
    case FsmState.OnError:
    case FsmState.OnResult:
    case FsmState.OnStart:
      return patch(initialState, {
        state: FsmState.OnOp1,
        operand1: '0.',
        memory: calcState.memory,
      });

    case FsmState.OnOp1:
      return patch(calcState, {
        operand1: operandService.appendPoint(calcState.operand1),
      });
      
    case FsmState.OnOp2:
      return patch(calcState, {
        operand2: operandService.appendPoint(calcState.operand2),
      });

    case FsmState.OnOperator:
      return patch(calcState, {
        state: FsmState.OnOp2,
        operand2: "0.",
      });

    case FsmState.OnOp1Result:
    case FsmState.OnOp2Result:
    case FsmState.PoweredOff:
      return { ...calcState };
  }
}