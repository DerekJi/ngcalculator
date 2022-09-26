import { CalcState } from "src/app/models/calc-state.model";
import { FsmState } from "src/app/models/fsm-state.enum";
import { ResetType } from "src/app/models/reset-type.enum";
import { initialState } from "../calculator.reducers";

export function onResetReduer(state: CalcState, { resetType }: { resetType: ResetType }): CalcState {
  return Object.assign({}, initialState, {
    state: FsmState.OnStart,
    memory: resetType === ResetType.C ? state.memory : initialState.memory,
  });
}
    