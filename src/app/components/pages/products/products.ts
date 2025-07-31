import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [],
  standalone: true,
  templateUrl: './products.html',
  styleUrls: ['./products.sass', '../../pagesstyles.scss']
})
export class Products {
  title: string = 'Products';
}
