export enum FsmState {
  OnStart = 'START',
  OnOp1 = 'OP1',
  OnOp1Result = 'OP1 RESULT',
  OnOperator = 'BINARY OPERATOR',
  OnOp2 = 'OP2',
  OnOp2Result = 'OP2 RESULT',
  // OnMemory = 'MEMORY',
  OnResult = 'RESULT',
  OnError = 'ERROR',
  PoweredOff = 'POWEREDOFF',
}