import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { NumberAction } from "src/app/shared/store/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-number-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class NumberButtonComponent extends ButtonComponent {
  override type: string = 'NUMBER';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    var num: Number = Number(this.text);
    this.store.dispatch(NumberAction({ num }));
  }
}