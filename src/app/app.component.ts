import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './service/products.service'; 
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  categories$: Subscription;
  categories: any;

  constructor(private router: Router, private productService: ProductsService) { } 
  
  ngOnInit() { 
    this.productService.categories$.subscribe(catg => { this.categories = catg });
  }

  getQuery($queryEvent) {
    this.router.navigate(['/items'], {queryParams: { search: $queryEvent }});
  }
}
