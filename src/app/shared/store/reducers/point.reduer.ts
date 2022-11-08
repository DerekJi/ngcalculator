import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { initialState } from "../calculator.reducers";
import { appendPoint } from "../operand.helper";

export function onPointReducer(calcState: CalcState): CalcState {
  switch (calcState.state) {
    case FsmState.OnError:
    case FsmState.OnResult:
    case FsmState.OnStart:
      return Object.assign({}, initialState, {
        state: FsmState.OnOp1,
        operand1: '0.',
        memory: calcState.memory,
      });

    case FsmState.OnOp1:
      return Object.assign({}, calcState, {
        operand1: appendPoint(calcState.operand1),
      });
      
    case FsmState.OnOp2:
      return Object.assign({}, calcState, {
        operand2: appendPoint(calcState.operand2),
      });

    case FsmState.OnOperator:
      return Object.assign({}, calcState, {
        state: FsmState.OnOp2,
        operand2: "0.",
      });

    case FsmState.OnOp1Result:
    case FsmState.OnOp2Result:
    case FsmState.PoweredOff:
      return Object.assign({}, calcState);
  }
}