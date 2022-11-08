import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { OperandService } from "../../services/operand.service";
import { initialState } from "../calculator.reducers";

const operandService = new OperandService();

export function onTypeNumberReducer(calcState: CalcState, { num }: { num: Number}): CalcState {
  switch (calcState.state) {
    case FsmState.OnOperator:
      return Object.assign({}, calcState, {
        state: FsmState.OnOp2,
        operand2: num.toString(),
      });
    
    case FsmState.OnStart:
    case FsmState.OnOp1:
      return Object.assign({}, calcState, {
        state: FsmState.OnOp1,
        operand1: operandService.appendNumber(calcState.operand1, num),
      });

    case FsmState.OnOp2:
      return Object.assign({}, calcState, {
        state: FsmState.OnOp2,
        operand2: operandService.appendNumber(calcState.operand2, num),
      });

    case FsmState.OnError:
    case FsmState.OnResult:
      return Object.assign({}, initialState, {
        state: FsmState.OnOp1,
        operand1: num.toString(),
        memory: calcState.memory,
      });

    case FsmState.OnOp1Result:
    case FsmState.OnOp2Result:
      return Object.assign({}, calcState, {
        state: FsmState.OnOp1,
        operand1: num.toString(),
      });

    case FsmState.PoweredOff:
        return Object.assign({}, calcState);
  }
}    