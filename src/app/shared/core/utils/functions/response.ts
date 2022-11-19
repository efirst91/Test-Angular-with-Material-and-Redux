import {GenericResponse} from "../../interfaces/api-response";
import {Product} from "../../interfaces/product";
import {ActionFunction} from "../../interfaces/actions-functions";


/**
 * Map the response to correct data
 */
export function mapToResponse(response: {}): GenericResponse[] {
  const result: GenericResponse[] = [];
  const entries = Object.entries(response);
  for (const entry of entries) {
    const newItem: GenericResponse = {
      name: entry[0],
      product: entry[1] as Product
    }
    result.push(newItem);
  }
  return result;
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
