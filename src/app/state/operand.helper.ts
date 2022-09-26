import { BinaryCalcOperator } from "../models/binary-operator.type";

export function backspace(operand: string): string {
  if (!operand || operand.length === 1) {
    return '0';
  }

  return operand.slice(0, operand.length - 1);
}

/**
 * 
 * @param operand 
 * @param num 
 * @returns 
 */
export function appendNumber(operand: string, num: Number): string {
  if (operand === '0') {
    return num.toString();
  }
  
  return operand + num.toString();
}

/**
 * 
 * @param operand 
 * @returns 
 */
export function appendPoint(operand: string): string {
  if (operand.indexOf('.') < 0) {
    return operand + '.';
  }

  return operand;
}

/**
 * 
 * @param op1 operand1
 * @param op2 operand2
 * @param oper binary operator
 * @returns 
 */
export function calculate(op1: string, op2: string, oper?: BinaryCalcOperator): string {
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

/**
 * 
 * @param operand 
 * @param maxLength 
 * @returns 
 */
export function toDisplay(operand: string, maxLength: number): string {
  if (!operand) {
    return '';
  }

  if (operand.toLowerCase() === 'ERROR'.toLocaleLowerCase()) return operand;

  var v = parseFloat(operand);
  if (v.toString().length < maxLength) {
    var display = v.toString();
    if (operand[operand.length - 1] === '.') {
      display = display + '.';
    }
    return display;
  }

  if (v > 0) {
    var v2 = operand.slice(0, 1) + '.' + operand.slice(1).replace('.', '');
    var timesf = Math.log10(v / parseFloat(v2));
    var times = parseInt(timesf.toString());
    return (
      v2.slice(0, maxLength - 2 - times.toString().length) +
      'E+' +
      times.toString()
    );
  }

  if (v < Math.pow(10, -11)) {
    var v2 = operand.slice(0, 1) + '.' + operand.slice(1);
    var times = Math.log10(v / parseFloat(v2));
    return (
      v2.slice(0, maxLength - 2 - times.toString().length) +
      'E-' +
      times.toString()
    );
  }

  return v.toString();
}