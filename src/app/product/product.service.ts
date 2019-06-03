import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

interface ProductData {
  id: string,
  name: string,
  description: string,
  price: number,
  stock: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products = new BehaviorSubject<Product[]>([
    new Product('p1', 'Test', 'Description test', 10, 10),
  ])

  constructor(private http: HttpClient) { }

  getColumnsTable(): string[] {
    return ["id", "name", "description", "price", 'stock'];
  }

  get products() {
    return this._products.asObservable();
  }

  fecthProducts() {
    return this.http
      .get<{ [key: string]: ProductData }>('https://angular-products-fcfm.firebaseio.com/products.json')
      .pipe(map(resData => {
        const products = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            products.push(
              new Product(
                key,
                resData[key].name,
                resData[key].description,
                resData[key].price,
                resData[key].stock))
          }
        }
        return products;
      }));
  }

  getProduct(id: string) {
    return this.products.pipe(
      take(1),
      map(products => {
        return { ...products.find(p => p.id === id) }
      })
    );
  }

  addProduct(
    name: string,
    description: string,
    price: number,
    stock: number
  ) {
    let generatedId: string;
    const newProduct = new Product(
      Math.random().toString(),
      name,
      description,
      price,
      stock
    );

    return this.http.post<{ name: string }>('https://angular-products-fcfm.firebaseio.com/products.json', { ...newProduct, id: null })
      .pipe(
        switchMap(restData => {
          generatedId = restData.name;
          return this.products;
        }),
        take(1),
        tap(products => {
          newProduct.id = generatedId;
          this._products.next(products.concat(newProduct));
        })
      );
  }

  deleteProduct(id: string) {
    // this._products.indexOf(())
    // this._products.splice(id, 1)
  }

}
