import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service'; 
import { NgxSpinnerService } from "ngx-spinner"; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ml-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
 
  id = null;
  details = {
    title: null,
    id: null,
    price: {
      currency: null,
      amount: 0
    },
    pictures: [],
    condicion: null,
    shipping: null,
    quantitySold: null,
    description: null
  };


  constructor(private route: ActivatedRoute,
    private product: ProductsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.details.id = params['id'];
    });

    this.spinner.show();
    this.product.getDetail(this.details.id)
      .subscribe((res: any) => {
      this.setDetail(res);
    },
      err => {
        if (err.status === 404) {
          this.spinner.hide();
          this.toastr.error('Ha ocurrido un problema obteniendo información del producto.', 'Intentelo más tarde');
        }
      });
  }

  setDetail(data) {
    const { condition, base_price, title, pictures, sold_quantity, currency_id } = data.detail;
    const { plain_text } = data.description;
    this.details.title = title;
    this.details.condicion = (condition === 'new' ? 'Nuevo' : 'Usado');
    this.details.price.currency = (currency_id !== 'ARS' ? 'U$S' : currency_id );
    this.details.price.amount = base_price;
    this.details.quantitySold = sold_quantity;
    this.details.pictures = pictures.map(element => element.url);
    this.details.description = plain_text;
    this.spinner.hide();
  }

}
