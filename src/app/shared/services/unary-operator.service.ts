import { Injectable } from '@angular/core';
import { UnaryCalcOperator } from '../models/unary-operator.type';

@Injectable({
  providedIn: 'root'
})
export class UnaryOperatorService {

  public unaryOperate(operand: string, oper: UnaryCalcOperator): string {
    if (!operand || operand === '0') {
      return operand;
    }
    
    switch (oper) {
      case '%':
        return this.percentage(operand);
      case '√':
        return this.squareRoot(operand);
      case '±':
      case '∓':
        return this.negate(operand);
    }
  }

  private percentage(operand: string): string {
    var value = parseFloat(operand);
    var result =  value / 100;
    return result.toString();
  }

  private squareRoot(operand: string): string {
    var value = parseFloat(operand);
    if (value < 0) {
      throw new Error("Invalid operand for square root operations");
    }
  
    var result = Math.sqrt(value);
    return result.toString();
  }

  private negate(operand: string): string {
    var value = parseFloat(operand);
    var result = -1 * value;
    return result.toString();
  }
  
}
