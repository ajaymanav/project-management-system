import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    code: '',
    name: '',
    quantity: 0,
    price: 0,
    description: '',
    category: '',
    subcategory: ''
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    if (productId) {
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
      });
    }
  }

  saveProduct() {
    if (this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
