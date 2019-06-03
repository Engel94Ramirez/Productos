import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  product: Product = new Product('', '', '', 0, 0);
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  onSaveProduct() {
    this.productService.addProduct(this.product.name, this.product.description, this.product.price, this.product.stock).subscribe((result) => {
      alert('Se agrego un nuevo producto');
      // this.router.navigateByUrl('/productos');
    });
  }

}
