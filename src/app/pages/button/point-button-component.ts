import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { PointAction } from "src/app/state/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-point-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class PointButtonComponent extends ButtonComponent {
  @Input() override text: string = '.';
  @Input() override type: string = 'POINT';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    this.store.dispatch(PointAction());
  }
}