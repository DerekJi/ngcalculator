import { createReducer, on } from "@ngrx/store";
import { CalcState } from "../models/calc-state.model";
import { FsmState } from "../models/fsm-state.enum";
import { BackspaceAction, EqualAction, PowerAction, ResetAction, BinaryOperatorAction, NumberAction, PointAction, UnaryOperatorAction, MemoryOperatorAction, MemoryRecallAction } from "./calculator.actions";
import { onResetReduer } from "./reducers/reset.reducer";
import { onTypeNumberReducer } from "./reducers/number.reducer";
import { onPowerReducer } from "./reducers/power.reducer";
import { onEqualReducer } from "./reducers/equal.reduer";
import { onPointReducer } from "./reducers/point.reduer";
import { onBinaryOperatorReducer } from "./reducers/binary-operator.reducer";
import { onBackspaceReducer } from "./reducers/backspace.reducer";
import { onUnaryOperatorReducer } from "./reducers/unary-operator.reducer";
import { onMemoryOperatorReducer } from "./reducers/memory-operator.reducer";
import { onMemoryRecallReducer } from "./reducers/memory-recall.reducer";

export const initialState: CalcState = {
  state: FsmState.OnStart,
  operand1: '0',
  operand2: '0',
  result: '0',
  memory: '0',
};

export const calculatorReducer = createReducer(
  initialState,
  
  on(PowerAction, onPowerReducer),

  on(ResetAction, onResetReduer),

  on(NumberAction,  onTypeNumberReducer),

  on(EqualAction, onEqualReducer),

  on(BackspaceAction, onBackspaceReducer),

  on(BinaryOperatorAction, onBinaryOperatorReducer),

  on(UnaryOperatorAction, onUnaryOperatorReducer),

  on(MemoryOperatorAction, onMemoryOperatorReducer),

  on(MemoryRecallAction, onMemoryRecallReducer),

  on(PointAction, onPointReducer),
);

