import { CalcState } from "src/app/models/calc-state.model";
import { FsmState } from "src/app/models/fsm-state.enum";
import { initialState } from "../calculator.reducers";

export function onPowerReducer(calcState: CalcState): CalcState {
  return Object.assign({}, initialState, {
    state: calcState.state === FsmState.PoweredOff ? FsmState.OnStart : FsmState.PoweredOff
  });
}