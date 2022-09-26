import { UnaryCalcOperator } from "../models/unary-operator.type";

export function unaryOperate(operand: string, oper: UnaryCalcOperator): string {
  if (!operand || operand === '0') {
    return operand;
  }
  
  switch (oper) {
    case '%':
      return percentage(operand);
    case '√':
      return squareRoot(operand);
    case '±':
    case '∓':
      return negate(operand);
  }
}

/**
 * 
 * @param operand 
 * @returns 
 */
function percentage(operand: string): string {
  var value = parseFloat(operand);
  var result =  value / 100;
  return result.toString();
}

/**
 * 
 * @param operand 
 * @returns 
 */
function squareRoot(operand: string): string {
  var value = parseFloat(operand);
  if (value < 0) {
    throw new Error("Invalid operand for square root operations");
  }

  var result = Math.sqrt(value);
  return result.toString();
}

/**
 * 
 * @param operand 
 * @returns 
 */
function negate(operand: string): string {
  var value = parseFloat(operand);
  var result = -1 * value;
  return result.toString();
}

