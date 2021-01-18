import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './service/products.service'; 
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  categories$: Subscription;
  categories: any;

  constructor(private router: Router, private productService: ProductsService) { } 

  getQuery($queryEvent) {
    this.router.navigate(['/items'], {queryParams: { search: $queryEvent }});
  }
}
