import { BinaryCalcOperator } from "src/app/shared/models/binary-operator.type";
import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { OperandService } from "../../services/operand.service";
import { initialState } from "../calculator.reducers";

const operandService = new OperandService();

export function onBinaryOperatorReducer(calcState: CalcState, { oper }: { oper: BinaryCalcOperator }): CalcState {
  try {
    switch (calcState.state) {
      case FsmState.OnStart:
      case FsmState.OnOp1:
      case FsmState.OnOp1Result:
      case FsmState.OnOperator:
        return Object.assign({}, calcState, {
          state: FsmState.OnOperator,
          operator: oper,
          operand2: initialState.operand2
        });
    
        case FsmState.OnResult:
          return Object.assign({}, calcState, {
            state: FsmState.OnOperator,
            operand1: calcState.result,
            operator: oper,
            operand2: initialState.operand2
          });
  
      case FsmState.OnError:
      case FsmState.PoweredOff:
        return Object.assign({}, calcState);
  
      case FsmState.OnOp2:
      case FsmState.OnOp2Result:
        return Object.assign({}, calcState, {
          state: FsmState.OnOperator,
          operand1: operandService.calculate(calcState.operand1, calcState.operand2, calcState.operator),
          operator: oper,
          operand2: initialState.operand2
        });
    }
  } catch {
    return Object.assign({}, calcState, {
      state: FsmState.OnError
    })
  }    
}