import { createAction, props } from "@ngrx/store";
import { BinaryCalcOperator } from "../models/binary-operator.type";
import { MemoryOperator } from "../models/memory-operator.type";
import { ResetType } from "../models/reset-type.enum";
import { UnaryCalcOperator } from "../models/unary-operator.type";

export const PowerAction = createAction("[Calculator] Power On/Off");

export const PointAction = createAction("[Calculator] Type Point");

export const EqualAction = createAction("[Calculator] Equal");

export const BackspaceAction = createAction("[Calculator] Backspace");


export const ResetAction = createAction("[Calculator] Reset", props<{ resetType: ResetType }>(),);

export const NumberAction = createAction("[Calculator] Type a number", props<{ num: Number }>(),);

export const MemoryRecallAction = createAction('[Calculator] Memory Recall');

export const MemoryOperatorAction = createAction('[Calculator] Memory Operator', props<{ oper: MemoryOperator }>());

export const UnaryOperatorAction = createAction('[Calculator] Unary Operator', props<{ oper: UnaryCalcOperator }>());

export const BinaryOperatorAction = createAction("[Calculator] Type a binary operator", props<{ oper: BinaryCalcOperator }>());