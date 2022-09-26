import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenComponent } from './screen/screen.component';
import { ButtonComponent } from './button/button.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DebugViewComponent } from './debug-view/debug-view.component';
import { PowerButtonComponent } from './button/power-button-component';
import { NumberButtonComponent } from './button/number-button-component';
import { PointButtonComponent } from './button/point-button-component';
import { BinaryOperatorButtonComponent } from './button/binary-operator-button-component';
import { EqualButtonComponent } from './button/equal-button-component';
import { ResetButtonComponent } from './button/reset-button-component';
import { BackspaceButtonComponent } from './button/backspace-button-component';
import { UnaryOperatorButtonComponent } from './button/unary-operator-button-component';
import { MemoryOperatorButtonComponent } from './button/memory-operator-button-component';
import { MemoryRecallButtonComponent } from './button/memory-recall-button-component';

const buttonComponents = [
  PowerButtonComponent,
  NumberButtonComponent,
  PointButtonComponent,
  EqualButtonComponent,
  ResetButtonComponent,
  BackspaceButtonComponent,
  BinaryOperatorButtonComponent,
  UnaryOperatorButtonComponent,
  MemoryOperatorButtonComponent,
  MemoryRecallButtonComponent,
];

@NgModule({
  declarations: [
    ScreenComponent, 
    ButtonComponent,
    ...buttonComponents,
    ControlPanelComponent,
    DebugViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScreenComponent, 
    ControlPanelComponent,
    DebugViewComponent
  ]
})
export class PagesModule { }
