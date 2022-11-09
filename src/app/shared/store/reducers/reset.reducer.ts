import { CalcState } from "src/app/shared/models/calc-state.model";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { ResetType } from "src/app/shared/models/reset-type.enum";
import { patch } from "../../helpers/immutable.helper";
import { initialState } from "../calculator.reducers";

export function onResetReduer(state: CalcState, { resetType }: { resetType: ResetType }): CalcState {
  return patch(initialState, {
    state: FsmState.OnStart,
    memory: resetType === ResetType.C ? state.memory : initialState.memory,
  });
}
