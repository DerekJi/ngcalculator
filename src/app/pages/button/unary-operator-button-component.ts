import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { UnaryCalcOperator } from "src/app/models/unary-operator.type";
import { UnaryOperatorAction } from "src/app/state/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-unary-operator-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class UnaryOperatorButtonComponent extends ButtonComponent {
  @Input() override type: string = 'UNARY_OPERATOR';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    var oper: UnaryCalcOperator = this.text as UnaryCalcOperator;
    this.store.dispatch(UnaryOperatorAction({ oper }));
  }
}