import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() type: string = 'NUMBER';

  get text$(): Observable<string> {
    return of(this.text);
  } 

  constructor(protected store: Store) { }

  ngOnInit(): void {
  }

  onClick(): void {
  }

}

