import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { MemoryOperator } from "src/app/shared/models/memory-operator.type";
import { MemoryOperatorAction } from "src/app/shared/store/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-memory-operator-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class MemoryOperatorButtonComponent extends ButtonComponent {
  override type: string = 'MEMORY_OPERATOR';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    var oper: MemoryOperator = this.text as MemoryOperator;
    this.store.dispatch(MemoryOperatorAction({ oper }));
  }
}