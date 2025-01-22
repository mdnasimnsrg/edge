import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const PRODUCTS_ENDPOINT = {
  getAll: {
    url: API_URL_V1 + '/v1/products',
    method: 'GET'
  },
  getPlans: {
    url: API_URL_V1 + '/v1/products/:productId/plans',
    method: 'GET'
  },
  getTestAPI: {
    url: API_URL_V1 + '/v1/apis/openapi',
    method: 'GET'
  },
  getPublicProducts: {
    url: API_URL_V1 + '/v1/publicProducts',
    method: 'GET'
  }
} satisfies { [key: string]: Endpoint }
