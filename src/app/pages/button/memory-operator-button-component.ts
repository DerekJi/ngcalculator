import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { MemoryOperator } from "src/app/models/memory-operator.type";
import { MemoryOperatorAction } from "src/app/state/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-memory-operator-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class MemoryOperatorButtonComponent extends ButtonComponent {
  @Input() override type: string = 'MEMORY_OPERATOR';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    var oper: MemoryOperator = this.text as MemoryOperator;
    this.store.dispatch(MemoryOperatorAction({ oper }));
  }
}