import { MemoryOperator } from "../models/memory-operator.type";
import { calculate } from "./operand.helper";

export function memoryOperate(memory: string, operand: string, oper: MemoryOperator): string {
  switch (oper) {
    case 'M+':
      return calculate(memory, operand, '+');
    case 'M-':
      return calculate(memory, operand, '-');
    case 'MC':
      return '0';
    case 'MS':
      return operand;
  }
}
