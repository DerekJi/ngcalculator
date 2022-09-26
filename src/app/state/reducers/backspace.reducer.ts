import { CalcState } from "src/app/models/calc-state.model";
import { FsmState } from "src/app/models/fsm-state.enum";
import { initialState } from "../calculator.reducers";
import { backspace, calculate } from "../operand.helper";

export function onBackspaceReducer(calcState: CalcState): CalcState {
  switch (calcState.state) {
    case FsmState.OnOp1:
      return Object.assign({}, calcState, {
        state: FsmState.OnOp1,
        operand1: backspace(calcState.operand1),
      });

    case FsmState.OnOp2:
      return Object.assign({}, calcState, {
        state: FsmState.OnOp2,
        operand2: backspace(calcState.operand2),
      });

    case FsmState.OnOperator:
    case FsmState.OnStart:
    case FsmState.OnError:
    case FsmState.OnResult:
    case FsmState.PoweredOff:
    case FsmState.OnOp1Result:
    case FsmState.OnOp2Result:
      return Object.assign({}, calcState);
  }
}