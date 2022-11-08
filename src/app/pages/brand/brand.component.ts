import { Component } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
  brand: string = 'Calculator';
  model: string = 'ng14-NgRX';
  author: string = 'Zhigang Ji';
}
