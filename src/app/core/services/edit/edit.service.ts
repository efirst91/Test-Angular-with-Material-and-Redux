import {Injectable} from '@angular/core';
import {environment} from "@environment/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../interfaces/product";
import {Observable} from "rxjs";
import {GenericResponse} from "../../interfaces/api-response";
import {DBCollectionName} from "../../utils/enums/enums";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private readonly EXTENSION = '.json'
  private readonly DEFAULT_URL = environment.apiUrl
  private readonly API_URL = this.DEFAULT_URL + '/products';

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  /**
   * Add new product
   * @param body product structure
   */
  public addNewProduct(body: Product): Observable<any> {
    const product: Product = {
      name: body.name,
      id: body.id,
      price: body.price,
      serial_number: body.serial_number
    }
    return this._httpClient.post(this.API_URL + this.EXTENSION, product);
  }

  /**
   * Update selected value
   * @param {GenericResponse} body selected row to update
   */
  public updateProduct(body: Product): Observable<any> {
    const product: Product = {
      name: body.name,
      id: body.id,
      price: body.price,
      serial_number: body.serial_number
    }
    return this._httpClient.put(`${this.API_URL}/${body.default_name}${this.EXTENSION}`, product)
  }

  /**
   * Delete selected element
   * @param {String} id name of deleted element
   */
  public deleteElement(id: string): Observable<any> {
    const apiUrl = id === DBCollectionName.PRODUCTS ? `${this.DEFAULT_URL}/${id}` : `${this.API_URL}/${id}`
    return this._httpClient.delete(`${apiUrl}${this.EXTENSION}`);
  }


}
