import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { configuration } from "src/app/app.configuration";
import { FsmState } from "src/app/shared/models/fsm-state.enum";
import { PowerAction } from "src/app/shared/store/calculator.actions";
import { selectFsmState } from "src/app/shared/store/calculator.selectors";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-power-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class PowerButtonComponent extends ButtonComponent {
  override type: string = 'POWER';
  constructor(protected override store: Store) { super(store); }

  override get text$(): Observable<string> {
    return this.store.select(selectFsmState).pipe(
      map((state: FsmState) => state === FsmState.PoweredOff ? 
          configuration.ON : configuration.OFF),
    );
  }
  
  override onClick(): void {
    this.store.dispatch(PowerAction());
  }
}