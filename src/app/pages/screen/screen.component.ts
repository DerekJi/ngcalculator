import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { configuration } from 'src/app/app.configuration';
import { ScreenService } from 'src/app/shared/services/screen.service';
import { selectOperand } from 'src/app/shared/store/calculator.selectors';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent {

  value$ = this.store.select(selectOperand)
            .pipe(
              map((value) => this.service.toDisplay(value, configuration.SCREEN_LENDTH)),
            );

  constructor(private store: Store, private service: ScreenService) { }
}
