import { API_URL_V1 } from './constants'
import { Endpoint } from './types'

export const INVOICES_ENDPOINTS = {
  download: { url: API_URL_V1 + '/v1/invoices/:invoiceId/download', method: 'GET' },
  getInvoiceHTML: { url: API_URL_V1 + '/v1/invoices/:invoiceId/html', method: 'GET' }
} satisfies { [key: string]: Endpoint }
