import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";

export function onMemoryRecallReducer(calcState: CalcState): CalcState {
  try {
    switch (calcState.state) {

      case FsmState.OnOp1:
      case FsmState.OnOp1Result:
      case FsmState.OnStart:
      case FsmState.OnResult:
        return Object.assign({}, calcState, {
          state: FsmState.OnOp1Result,
          operand1: calcState.memory,
        });
        
      case FsmState.OnOp2:
      case FsmState.OnOp2Result:
      case FsmState.OnOperator:
        return Object.assign({}, calcState, {
          state: FsmState.OnOp2Result,
          operand2: calcState.memory,
        });
  
      case FsmState.OnError:
      case FsmState.PoweredOff:
        return Object.assign({}, calcState);
    }
  } catch {
    return Object.assign({}, calcState, {
      state: FsmState.OnError
    })
  }  
}