import { BinaryCalcOperator } from "./binary-operator.type";
import { FsmState } from "./fsm-state.enum";

export interface CalcState {
  state: FsmState;
  operand1: string;
  operand2: string;
  operator?: BinaryCalcOperator;
  memory: string;
  result: string;
}