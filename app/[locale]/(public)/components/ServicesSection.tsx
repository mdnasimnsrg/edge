'use client'
import { IProduct } from '@/@types/api/interfaces'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import { ServiceCard } from './ServiceCard'

export function ServicesSection() {
  const { data: products, isPending } = useRequester<IProduct[]>({ endpoint: PRODUCTS_ENDPOINT.getPublicProducts })

  return (
    <section className='h-[971px] bg-white relative'>
      {/* <img
        src='/landing/service-background.svg'
        alt=''
        width={1228}
        height={770}
        className='absolute top-[100px] right-1/2 translate-x-1/2 '
      /> */}
      <div className='container flex flex-col items-center justify-center py-[100px] '>
        {/* <SectionTitle title='' /> */}
        <button className='text-sm text-black border border-black inline-block py-2 px-5 rounded-md font-semibold'>Our Solution</button>
        <p className='font-medium text-[40px] pt-3 z-20'>
        Monetize your ideas with Edge’s API Service.
        </p>
        <p className='font-medium text-center text-xl text-[#64748B] z-20'>
        Unlock endless opportunities and transform your APIs into valuable revenue streams with our innovative API platform.
        </p>
        <div className='pt-[60px] pb-[40px] gap-6 z-10 grid grid-cols-3 w-full'>
          {isPending ? (
            <div className='col-span-3 h-[514px]'>
              <LoadingSpinner />
            </div>
          ) : (
            products && products.slice(0, 3).map(product => <ServiceCard key={product.id} product={product} />)
          )}
        </div>
        <Link href={'/services'} className='z-10'>
          <Button>Learn More</Button>
        </Link>
      </div>
    </section>
  )
}
