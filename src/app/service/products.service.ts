import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const Url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  maxResults = 4;
  private categoriesSubj$ = new Subject<void>();
  public categories$ = this.categoriesSubj$.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(query): Observable<any> {
    return this.http.get(`${Url}/items?search=${query}`);
  }

  getDetail(id):Observable<any> {
    return this.http.get(`${Url}/items/${id}`);
  }
  
  setCategories(categories) {
    let arrayCategories = categories.values[0].path_from_root.map(element => element.name)
    this.categoriesSubj$.next(arrayCategories);
  }

  filterProducts(list) {
    return list.slice(0, this.maxResults);
  }
  
}
