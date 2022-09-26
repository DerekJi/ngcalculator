import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { PagesModule } from './pages/pages.module';
import { calculatorReducer } from './state/calculator.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    StoreModule.forRoot({ calc: calculatorReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
