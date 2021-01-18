import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListResultComponent } from './list-result/list-result.component';
import { DetailComponent } from './detail/detail.component';

//external
import { SliderCarouselModule } from 'slider-carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

//services
import { ProductsService } from './service/products.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListResultComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SliderCarouselModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
