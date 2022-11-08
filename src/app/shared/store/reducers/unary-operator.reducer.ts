import { UnaryCalcOperator } from "src/app/shared/models/unary-operator.type";
import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { UnaryOperatorService } from "../../services/unary-operator.service";

const unaryService = new UnaryOperatorService();

export function onUnaryOperatorReducer(calcState: CalcState, { oper }: { oper: UnaryCalcOperator }): CalcState {
  try {
    switch (calcState.state) {

      case FsmState.OnOp1:
      case FsmState.OnOp1Result:
        return Object.assign({}, calcState, {
          state: FsmState.OnOp1Result,
          operand1: unaryService.unaryOperate(calcState.operand1, oper),
        });
      
      case FsmState.OnOp2:
      case FsmState.OnOp2Result:
        return Object.assign({}, calcState, {
          state: FsmState.OnOp2Result,
          operand2: unaryService.unaryOperate(calcState.operand2, oper),
        });
  
      case FsmState.OnResult:
        return Object.assign({}, calcState, {
          state: FsmState.OnResult,
          result: unaryService.unaryOperate(calcState.result, oper),
        });
  
      case FsmState.OnStart:
      case FsmState.OnOperator:
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