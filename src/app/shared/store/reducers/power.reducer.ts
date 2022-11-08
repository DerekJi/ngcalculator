import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { initialState } from "../calculator.reducers";

export function onPowerReducer(calcState: CalcState): CalcState {
  return Object.assign({}, initialState, {
    state: calcState.state === FsmState.PoweredOff ? FsmState.OnStart : FsmState.PoweredOff
  });
}