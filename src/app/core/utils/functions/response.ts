import {Product} from "../../interfaces/product";
import {ActionFunction} from "../../interfaces/actions-functions";


/**
 * Map the response to correct data
 * @description data come from api with another structure and this method
 * convert this answer in a correct product data array
 * @example data from api = {
 *   -xyz {
 *     id: asd2,
 *     name: 'TV',
 *     price: 450,
 *     serial_number: asd45
 *   }
 * }
 * @return {Product[]}
 *
 */
export function mapToResponse(response: {}): Product[] {
  const products: Product[] = [];
  const entries = Object.entries(response);
  for (const entry of entries) {
    const itemEntry = entry[1] as Product;
    const newProd: Product =
      {
        name: itemEntry.name,
        id: itemEntry.id,
        serial_number: itemEntry.serial_number,
        price: itemEntry.price
      }
    newProd.default_name = entry[0];
    products.push(newProd)
  }
  return products;
}


/**
 * Get correct title for dialog
 * @param action action to be executed
 * @private
 */
export function getTitle(action: string): string {
  const titles: ActionFunction = {
    New: () => 'Nuevo producto',
    Edit: () => 'Modificar producto',
    Delete: () => 'Eliminar producto'
  }

  return titles[action]();
}
