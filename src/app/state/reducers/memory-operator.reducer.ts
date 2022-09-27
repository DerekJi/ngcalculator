import { MemoryOperator } from "src/app/models/memory-operator.type";
import { CalcState } from "src/app/models/calc-state.model";
import { FsmState } from "src/app/models/fsm-state.enum";
import { memoryOperate } from "../memory-operator.helper";

export function onMemoryOperatorReducer(calcState: CalcState, { oper }: { oper: MemoryOperator }): CalcState {
  try {
    switch (calcState.state) {

      case FsmState.OnOp1:
      case FsmState.OnOp1Result:
      case FsmState.OnStart:
      case FsmState.OnOperator:
        return Object.assign({}, calcState, {
          state: FsmState.OnOp1Result,
          memory: memoryOperate(calcState.memory, calcState.operand1, oper),
        });

      case FsmState.OnResult:
        return Object.assign({}, calcState, {
          state: FsmState.OnOp1Result,
          memory: memoryOperate(calcState.memory, calcState.result, oper),
        });
      
      case FsmState.OnOp2:
      case FsmState.OnOp2Result:
        return Object.assign({}, calcState, {
          state: FsmState.OnOp2Result,
          memory: memoryOperate(calcState.memory, calcState.operand2, oper),
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