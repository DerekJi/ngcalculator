import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  constructor() { }

  brand: string = 'Calculator';
  model: string = 'ng14-NgRX';
  author: string = 'Zhigang Ji';

  ngOnInit(): void {
  }

}
