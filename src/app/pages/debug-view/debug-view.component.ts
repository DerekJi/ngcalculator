import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFsmState, selectMemory, selectOperand, selectOperand1, selectOperand2, selectOperator, selectResult } from 'src/app/state/calculator.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-debug-view',
  templateUrl: './debug-view.component.html',
  styleUrls: ['./debug-view.component.scss']
})
export class DebugViewComponent implements OnInit {

  isDevTest = !environment.production;

  state$ = this.store.select(selectFsmState);
  op$ = this.store.select(selectOperand);
  op1$ = this.store.select(selectOperand1);
  oper$ = this.store.select(selectOperator);
  op2$ = this.store.select(selectOperand2);
  result$ = this.store.select(selectResult);
  memory$ = this.store.select(selectMemory);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
