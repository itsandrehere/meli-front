import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service'; 
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner"; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ml-list-result',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.scss']
})
export class ListResultComponent implements OnInit {
  loading: boolean = false;
  query: string; 
  items = null;
  categories = null;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private product: ProductsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['search'];
      this.getData();
    });
  }

  getData() {
    this.query === '' ? this.query = 'undefined' : null;
    this.spinner.show();
    this.loading = true;
    this.product.getProducts(this.query)
    .subscribe((res: any) => {
      this.items = this.setResults(res);
      this.createCategories(res);
      this.spinner.hide();
      this.loading = false;
    },
      err => {
        this.loading = false;
        this.spinner.hide();
        if (err.status === 404) {
          this.toastr.error('Ha ocurrido un problema conectando al servidor', 'Intentelo más tarde');
        }
      });
  }

  createCategories(result) {
    result.filters.length ? this.product.setCategories(result.filters[0]) : this.product.setCategories([]);
  }

  setResults(result) {
     return this.product.filterProducts(result.results);
  }

}
