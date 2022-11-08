import { MemoryOperator } from "../models/memory-operator.type";
import { OperandService } from "../services/operand.service";

const operandService = new OperandService();

export function memoryOperate(memory: string, operand: string, oper: MemoryOperator): string {
  switch (oper) {
    case 'M+':
      return operandService.calculate(memory, operand, '+');
    case 'M-':
      return operandService.calculate(memory, operand, '-');
    case 'MC':
      return '0';
    case 'MS':
      return operand;
  }
}
