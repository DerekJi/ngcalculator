import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PowerAction } from 'src/app/state/calculator.actions';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  power(): void {
    this.store.dispatch(PowerAction());
  }
}
