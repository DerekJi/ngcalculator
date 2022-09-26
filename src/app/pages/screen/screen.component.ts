import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectOperand } from 'src/app/state/calculator.selectors';
import { toDisplay } from 'src/app/state/operand.helper';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  value$ = this.store.select(selectOperand)
            .pipe(
              map((value) => toDisplay(value, 12)),
            );

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
