'use client'
import { IProduct, ISubscription } from '@/@types/api/interfaces'
import { ServiceCardV2 } from '@/app/[locale]/(public)/components/ServiceCard'
import CardWrapper from '@/components/wrappers/card-wrapper'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import PageWrapper from '@/components/wrappers/page-wrapper'
import { CONSUMER_ORGANIZATIONS_ENDPOINTS } from '@/endpoints/consumer-organizations'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'

export default function Products() {
  const { isLoading, data } = useRequester<IProduct[]>({ endpoint: PRODUCTS_ENDPOINT.getAll })

  const { data: subscriptions } = useRequester<ISubscription[]>({
    endpoint: CONSUMER_ORGANIZATIONS_ENDPOINTS.getActiveSubscriptions,
    options: { queryKey: ['subscriptions'] }
  })

  return (
    <PageWrapper
      breadcrumbs={[
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/services', label: 'Services' }
      ]}
    >
      <CardWrapper title='Browse Rabet Service'>
        <LoadingWrapper isLoading={isLoading}>
          <div className='grid  grid-cols-1 lg:grid-cols-2 gap-6 '>
            {data &&
              data?.map(product => {
                return <ServiceCardV2 product={product} key={product.id} subscriptions={subscriptions} />
              })}
          </div>
        </LoadingWrapper>
      </CardWrapper>
    </PageWrapper>
  )
}
