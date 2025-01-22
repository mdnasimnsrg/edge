'use client'
import { IProduct } from '@/@types/api/interfaces'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { ServiceCard } from '../components/ServiceCard'

export default function Product() {
  const { isLoading, data } = useRequester<IProduct[]>({ endpoint: PRODUCTS_ENDPOINT.getPublicProducts })

  return (
    <main>
      <div className='py-[100px] bg-gradient-to-br from-primary to-primary pt-6'>
        <h1 className='text-3xl font-medium text-white text-center mt-4 mb-10 capitalize '>All products</h1>
        <LoadingWrapper isLoading={isLoading}>
          <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 '>
            {data &&
              data?.map(product => {
                return <ServiceCard key={product.id} product={product} />
              })}
          </div>
        </LoadingWrapper>
      </div>
    </main>
  )
}
