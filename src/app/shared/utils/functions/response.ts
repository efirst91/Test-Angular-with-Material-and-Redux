import {GenericResponse} from "../../interfaces/api-response";
import {Product} from "../../interfaces/product";


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
