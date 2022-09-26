import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { EqualAction } from "src/app/state/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-equal-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class EqualButtonComponent extends ButtonComponent {
  @Input() override text: string = '=';
  @Input() override type: string = 'EQUAL';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    this.store.dispatch(EqualAction());
  }
}