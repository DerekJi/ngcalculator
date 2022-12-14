import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = '';
  protected type: string = '';
  protected keyDown: boolean = false;

  get keyDownClass(): string { 
    return this.keyDown ? 'btn-down' : '';
  }

  get text$(): Observable<string> {
    return of(this.text);
  } 

  constructor(protected store: Store) { }

  onClick(): void { }

  onKeyDown(): void { this.keyDown = true; }

  onKeyUp(): void { this.keyDown = false; }
}

