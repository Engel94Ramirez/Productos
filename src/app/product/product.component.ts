import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;
  columns: string[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // this.columns = this.productService.getColumnsTable();
    // this.products = this.productService.products;
  }

}
