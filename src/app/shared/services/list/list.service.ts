import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../interfaces/product";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private readonly API_URL = environment.apiUrl + '/products.json';

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  /**
   * Get all products
   * @return {Observable<Product[]>}
   */
  public getAllProduct(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.API_URL);
  }
}
