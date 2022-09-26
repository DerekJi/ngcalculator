import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { BinaryCalcOperator } from "src/app/models/binary-operator.type";
import { BinaryOperatorAction } from "src/app/state/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-binary-operator-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class BinaryOperatorButtonComponent extends ButtonComponent {
  @Input() override type: string = 'BINARY_OPERATOR';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    var oper: BinaryCalcOperator = this.text as BinaryCalcOperator;
    this.store.dispatch(BinaryOperatorAction({ oper }));
  }
}