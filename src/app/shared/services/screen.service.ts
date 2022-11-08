import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor() { }

  
  public toDisplay(operand: string, maxLength: number): string {
    if (!operand) {
      return '';
    }
  
    if (operand.toLowerCase().includes('ERROR'.toLocaleLowerCase())) return operand;
  
    var v = parseFloat(operand);
    if (v.toString().length <= maxLength) {
      var display = v.toString();
      if (operand[operand.length - 1] === '.') {
        display = display + '.';
      }
      return display;
    }
  
    if (v > Math.pow(10, maxLength - 1)) {
      var v2 = operand.slice(0, 1) + '.' + operand.slice(1).replace('.', '');
      var timesf = Math.log10(v / parseFloat(v2));
      var times = parseInt(timesf.toString());
      var s3 = v2.slice(0, maxLength - 2 - times.toString().length);
      var v3 = parseFloat(s3);
      return (
        v3.toString() +
        'E+' +
        times.toString()
      );
    }
  
    if (v < Math.pow(10, 1 - maxLength)) {
      var v2 = operand.slice(0, 1) + '.' + operand.slice(1);
      var times = Math.log10(v / parseFloat(v2));
      if (times === 0) {
        return v2.slice(0, maxLength);
      }
      return (
        v2.slice(0, maxLength - 2 - times.toString().length) +
        'E-' +
        times.toString()
      );
    }
  
    var v2 = v.toString();
    return v2.slice(0, maxLength);
  }
}
