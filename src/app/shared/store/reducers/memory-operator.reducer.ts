import { MemoryOperator } from "src/app/shared/models/memory-operator.type";
import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { memoryOperate } from "../../helpers/memory-operator.helper";
import { patch } from "../../helpers/immutable.helper";

export function onMemoryOperatorReducer(calcState: CalcState, { oper }: { oper: MemoryOperator }): CalcState {
  try {
    switch (calcState.state) {

      case FsmState.OnOp1:
      case FsmState.OnOp1Result:
      case FsmState.OnStart:
      case FsmState.OnOperator:
        return patch(calcState, {
          state: FsmState.OnOp1Result,
          memory: memoryOperate(calcState.memory, calcState.operand1, oper),
        });

      case FsmState.OnResult:
        return patch(calcState, {
          state: FsmState.OnOp1Result,
          operand1: calcState.result,
          memory: memoryOperate(calcState.memory, calcState.result, oper),
        });
      
      case FsmState.OnOp2:
      case FsmState.OnOp2Result:
        return patch(calcState, {
          state: FsmState.OnOp2Result,
          memory: memoryOperate(calcState.memory, calcState.operand2, oper),
        });
      
      case FsmState.OnError:
      case FsmState.PoweredOff:
        return { ...calcState };
    }
  } catch {
    return patch(calcState, {
      state: FsmState.OnError
    })
  }  
}