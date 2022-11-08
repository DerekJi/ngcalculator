import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { patch } from "../../helpers/immutable.helper";
import { initialState } from "../calculator.reducers";

export function onPowerReducer(calcState: CalcState): CalcState {
  return patch(initialState, {
    state: calcState.state === FsmState.PoweredOff ? FsmState.OnStart : FsmState.PoweredOff
  });
}