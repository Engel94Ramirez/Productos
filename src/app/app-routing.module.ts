import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { NewProductComponent } from './product/new-product/new-product.component';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductComponent,
    // children: [
    //   {
    //     path: ':productId',
    //     component: ProductDetailComponent
    //   },
    //   {
    //     path: 'new',
    //     component: NewProductComponent
    //   }
    // ]
  },
  {
    path: 'new-product',
    component: NewProductComponent
  },
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
