export interface IProduct {
  id: number
  name: string
  prettyName:string
  description: string
  productDocumentation?: any
  imageUrl: string
  apicProductId: string
}
export interface IPlan {
  id: number
  name: string
  prettyName:string
  description: string
  price: number
  product: IProduct
  icon: string
  features: IFeature[]
  apis: any[]
  billingPeriod: string
  planType: {
    name: 'PREPAID' | 'POSTPAID' | 'USAGE BASED'
  }
  billing: 'USAGE' | 'REQUIRING'
  currency: string
  usage:number
  subscribed: boolean
  recommended?:boolean
}
export interface IFeature {
  feature: string
  icon: string
}

export interface ISubscription {
  id: number
  startDate: number[]
  renewalDate: number[]
  user: User
  status: string
  plan: IPlan
  clientId: string
  clientSecret: string
}

interface User {
  id: number
  username: string
  organizationName?: any
}

export interface IInvoice {
  invoiceNumber: string
  invoiceDate: number[]
  currency: string
  totalAmount: number
  unpaidAmount: number
  items: IInvoiceItem[]
  invoiceId: string
}

interface IInvoiceItem {
  prettyProductName: string
  prettyPlanName: string
  phaseName: string
  startDate: number[]
  endDate: number[]
  amount: number
  currency: string
}

export interface IPayment {
  targetInvoiceId: string
  paymentNumber: string
  purchasedAmount: number
  currency: string
  transactions: Transaction[]
}

interface Transaction {
  amount: number
  effectiveDate: number[]
  status: string
}

export interface ISpendingPerService {
  accountId: string
  productName: string
  planName: string
  spending: number
  currency: string
}

export interface IUpcomingRenewals {
  serviceName: string
  startDate: number[]
  endDate: number[]
  price: number
  dayLeft: number
  serviceImage: string
  planName: string
}

export interface ITotalCallsPerService {
  productName: string
  totalCall: number
}

export interface IProfile {
  avatar: string
  username: string
  email: string
  firstName: string
  lastName: string
  mobileNumber: string
  nationalId: string
  consumerOrganization: IConsumerOrganization
}

interface IConsumerOrganization {
  nameEnglish: string
  number: string
  crNumber: string
  vatNumber: string
  ownerUrl?: any
  postalCode: string
  city: string
}

export interface ICONSUMER_ORG {
  catalogs: string
  start: string
  end: string
  type: string
  ref: string
  trends: Trends
  breakdown: Breakdown
  api_calls: Apicalls
  response_times: Responsetimes
  api_leaderboard: Apileaderboard[]
  product_leaderboard: Apileaderboard[]
}

interface Apileaderboard {
  rank: number
  ref: string
  total: number
  errors: number
  success: number
}

interface Responsetimes {
  total: number
  data: Datum2[]
}

interface Apicalls {
  data: Datum2[]
}

interface Datum2 {
  group: string
  date: string
  value: number
}

interface Breakdown {
  errors: Errors
  successes: Errors
  total_api_calls: Errors
  bytes_received: Errors
  bytes_sent: Errors
}

interface Errors {
  data: Datum[]
}

interface Datum {
  group: string
  date?: any
  value: number
}

interface Trends {
  subscription_count: Subscriptioncount
}

interface Subscriptioncount {
  trend: string
  value: number
}

export interface ITotalCost {
  productName?: string
  planName?: string
  amount: string
}

export interface IProduct_Latency {
  search_time: number
  min_response_time: {
    data: number
  }
  avg_response_time: {
    data: number
  }
  max_response_time: {
    data: number
  }
  response_times: {
    total: number
    data: any[]
  }
  response_times_successful_calls: {
    total: number
    data: any[]
  }
  response_times_error_calls: {
    total: number
    data: any[]
  }
  apis_with_slowest_response_time: {
    total: number
    data: any[]
  }
  apis_with_fastest_response_time: {
    total: number
    data: any[]
  }
}

export interface IProduct_API {
  id: string
  name: string
  title: string
  version: string
  url: string
}

export interface ITop_Usage {
  searchTime: number
  apps_per_plan: Appsperplan
  total_products: Totalproducts
  top_products_by_calls: Appsperplan
  total_plan?: any
  top_products_over_time: {
    total: number
    data: {
      group: string
      date: number
      value: number
    }[]
  }
  top_products_by_errors: Appsperplan
  top_products_for_errors_over_time: {
    total: number
    data: {
      group: string
      date: string
      value: number
    }[]
  }
  top_plans_over_time: {
    total: number
    data: {
      group: string
      date: number
      value: number
    }[]
  }
  top_plans_by_calls: Appsperplan
  top_plans_for_errors_over_time: {
    total: number
    data: {
      group: string
      date: string
      value: number
    }[]
  }
  top_plans_by_errors: Appsperplan
}

interface Totalproducts {
  data: number
}

interface Appsperplan {
  total: number
  data: {
    group: string
    value: number
  }[]
}

export interface IAnalysis {
  [x: string]: {
    group: string
    value: number
  }[]
}
