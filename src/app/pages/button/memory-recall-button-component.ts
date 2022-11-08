import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { MemoryRecallAction } from "src/app/state/calculator.actions";
import { ButtonComponent } from "./button.component";

@Component({
  selector: 'app-memory-recall-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class MemoryRecallButtonComponent extends ButtonComponent {
  override text: string = 'MR';
  override type: string = 'MEMORY_RECALL';
  constructor(protected override store: Store) { super(store); }
  
  override onClick(): void {
    this.store.dispatch(MemoryRecallAction());
  }
}