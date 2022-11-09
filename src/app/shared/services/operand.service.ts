import { Injectable } from '@angular/core';
import { BinaryCalcOperator } from '../models/binary-operator.type';

@Injectable({
  providedIn: 'root'
})
export class OperandService {

  constructor() { }

  public backspace(operand: string): string {
    if (!operand || operand.length === 1) {
      return '0';
    }
  
    return operand.slice(0, operand.length - 1);
  }

  public appendNumber(operand: string, num: Number): string {
    if (operand === '0') {
      return num.toString();
    }
    
    return operand + num.toString();
  }

  public appendPoint(operand: string): string {
    if (operand.indexOf('.') < 0) {
      return operand + '.';
    }
  
    return operand;
  }

  public calculate(op1: string, op2: string, oper?: BinaryCalcOperator): string {
    var v = 0;
  
    var v1 = parseFloat(op1);
    var v2 = parseFloat(op2)
  
    switch (oper) {
      case '*':
      case '×': 
      case '✕':
        v = v1 * v2; break;
      case '+':    
        v = v1 + v2; break;
      case '-':
        v = v1 - v2; break;
      case '/':
      case '÷':
        v = v1 / v2; break;
    }
  
    return v.toString();
  }
}
