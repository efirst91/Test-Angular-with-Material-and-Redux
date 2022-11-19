import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../interfaces/product";
import {Observable} from "rxjs";
import {GenericResponse} from "../../interfaces/api-response";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private readonly EXTENSION = '.json'
  private readonly API_URL = environment.apiUrl + '/products';

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  /**
   * Add new product
   * @param body product structure
   */
  public addNewProduct(body: Product): Observable<any> {
    return this._httpClient.post(this.API_URL + this.EXTENSION, body);
  }

  /**
   * Update selected value
   * @param {GenericResponse} body selected row to update
   */
  public updateProduct(body: GenericResponse): Observable<any> {
    return this._httpClient.put(`${this.API_URL}/${body.name}${this.EXTENSION}`, body.product)
  }

  /**
   * Delete selected element
   * @param {String} id name of deleted element
   */
  public deleteElement(id: string): Observable<any> {
    return this._httpClient.delete(`${this.API_URL}/${id}${this.EXTENSION}`);
  }


}
