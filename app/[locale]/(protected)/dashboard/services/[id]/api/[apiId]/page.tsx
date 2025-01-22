'use client'

import { IProduct, IProduct_API } from '@/@types/api/interfaces'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import PageWrapper from '@/components/wrappers/page-wrapper'
import { PRODUCT_API_ENDPOINTS } from '@/endpoints/api'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import { useLocale } from 'next-intl'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function Page({ params }: { params: { apiId: string; id: string } }) {
  const { apiId, id } = params

  const { data: api } = useRequester<IProduct_API[]>({
    endpoint: PRODUCT_API_ENDPOINTS.getProductAPIs,
    replace: { productId: id as string }
  })

  const targetAPIDetails = api?.find((el: any) => el.id == apiId)

  const locale = useLocale()
  const { data } = useRequester<IProduct[]>({
    endpoint: PRODUCTS_ENDPOINT.getAll
  })
  const product = data && data?.filter(product => product.id === Number(params.id))[0]

  return (
    <PageWrapper className='px-10 pt-4'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={'/dashboard/services'} className=' text-base font-medium'>
              Services
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={`  ${locale === 'ar' ? 'rotate-180' : ''}`} />
          <BreadcrumbItem>
            <Link href={`/dashboard/services/${params.id}`} className='text-base font-medium'>
              {product?.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={`  ${locale === 'ar' ? 'rotate-180' : ''}`} />
          <BreadcrumbItem>
            <Link href={'/'} className='text-base font-medium'>
              {targetAPIDetails?.name}
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SwaggerUI url={`${process.env.NEXT_PUBLIC_BASE_URL}/api/json/${id}/${apiId}`} />
    </PageWrapper>
  )
}
