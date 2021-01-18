import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../service/products.service'; 
import { Subscription } from "rxjs";

@Component({
  selector: 'ml-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit , OnDestroy {
  categories$: Subscription;
  categories: any;

  constructor(private productService: ProductsService) { } 
  
  ngOnInit() { 
    this.categories$ = this.productService.categories$.subscribe(catg => { this.categories = catg });
  }

  ngOnDestroy(){
    this.categories$.unsubscribe();
  }
}
