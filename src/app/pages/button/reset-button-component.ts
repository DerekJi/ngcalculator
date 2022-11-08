import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ResetType } from "src/app/models/reset-type.enum";
import { ResetAction } from "src/app/state/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-reset-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ResetButtonComponent extends ButtonComponent {
  override type: string = 'OPERATOR';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    var resetType: ResetType = this.text as ResetType;
    this.store.dispatch(ResetAction({ resetType }));
  }
}