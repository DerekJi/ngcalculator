import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { BackspaceAction } from "src/app/state/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-backspace-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class BackspaceButtonComponent extends ButtonComponent {
  @Input() override text: string = '⌫';
  @Input() override type: string = 'BACKSPACE';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    this.store.dispatch(BackspaceAction());
  }
}