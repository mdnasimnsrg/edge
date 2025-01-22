'use client'
import { IProduct } from '@/@types/api/interfaces'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import LoadingWrapper from '@/components/wrappers/loading-wrapper'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { SectionTitle } from '../components/SectionTitle'
import { ServiceCard } from '../components/ServiceCard'

export default function TryOut() {
  const { data: products, isPending } = useRequester<IProduct[]>({ endpoint: PRODUCTS_ENDPOINT.getAll })

  return (
    <div className='bg-[#f6f6f6] py-[100px]'>
      <div className='container flex flex-col justify-center items-center '>
        <SectionTitle title='Test Our Services' />
        <p className='font-medium text-[40px] pt-3'>
          Unlock Your Potential, by Test <span className='text-secondary'>Rabet</span> APIs!
        </p>
        <p className='font-medium text-xl text-[#64748B]'>
          Welcome to our API testing platform, where you can explore the capabilities of our APIs
        </p>
        <div className='pt-[60px] pb-[40px] gap-6 z-10 grid grid-cols-3 w-full'>
          <LoadingWrapper
            isLoading={isPending}
            loadingEl={
              <div className='col-span-3'>
                <LoadingSpinner color='text-primary' />
              </div>
            }
          >
            {products && products.map(product => <ServiceCard key={product.id} product={product} tryout />)}
          </LoadingWrapper>
        </div>
      </div>
    </div>
  )
}
