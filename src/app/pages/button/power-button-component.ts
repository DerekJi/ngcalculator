import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { FsmState } from "src/app/models/fsm-state.enum";
import { PowerAction } from "src/app/state/calculator.actions";
import { selectFsmState } from "src/app/state/calculator.selectors";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-power-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class PowerButtonComponent extends ButtonComponent {
  @Input() override type: string = 'POWER';
  constructor(protected override store: Store) { super(store); }

  override get text$(): Observable<string> {
    return this.store.select(selectFsmState).pipe(
      map((state: FsmState) => state === FsmState.PoweredOff ? 'On' : 'Off'),
    );
  }
  
  override onClick(): void {
    this.store.dispatch(PowerAction());
  }
}