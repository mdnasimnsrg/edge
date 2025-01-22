'use client'
import { IProduct } from '@/@types/api/interfaces'
import PageWrapper from '@/components/wrappers/page-wrapper'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { useParams } from 'next/navigation'
import { AboutSection } from './AboutSection'
import { DocumentationTab } from './DocumentationTab'
import { PlansTab } from './PlansTab'
import { ProductAPIsTab } from './ProductAPIsTab'

export default function Product() {
  const params = useParams()
  const { data } = useRequester<IProduct[]>({
    endpoint: PRODUCTS_ENDPOINT.getAll
  })
  const product = data && data?.filter(product => product.id === Number(params.id))[0]

  return (
    <PageWrapper
      className='relative bg-white px-0 pt-0'
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Services', href: '/dashboard/services' },
        { label: `${product?.name}`, href: `/dashboard/services/${product?.id}` }
      ]}
    >
      <AboutSection />
      <PlansTab />
      <ProductAPIsTab />
      <DocumentationTab />
    </PageWrapper>
  )
}
