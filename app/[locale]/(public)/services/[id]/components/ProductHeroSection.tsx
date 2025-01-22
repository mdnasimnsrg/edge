'use client'
import { IProduct } from '@/@types/api/interfaces'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export function ProductHeroSection() {
  const locale = useLocale()
  const params = useParams()
  const { data } = useRequester<IProduct[]>({
    endpoint: PRODUCTS_ENDPOINT.getPublicProducts
  })

  const product = data && data?.filter(product => product.id === Number(params.id))[0]

  return (
    <section className='relative overflow-hidden  bg-gradient-to-br from-[#014a43] to-[#007166]'>
      <Image
        src={locale === 'en' ? '/products/product-hero-background.svg' : '/landing/landing-hero-image-ar.svg'}
        alt=''
        width={1662}
        height={970}
        className={`absolute top-[110px] left-[100px]`}
      />

      <div className='container relative'>
        <div className='w-[251px] h-[251px] flex justify-center items-center rounded-full absolute bg-[rgba(0,0,0,0.1)] top-[285px] end-[94px]'>
          <img
            src={product?.imageUrl}
            width={200}
            height={115}
            alt=''
            className='object-fill'
          />
        </div>
        
        <Breadcrumb className='pt-6'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={'/'} className='text-white text-lg'>
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={`text-white  ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <BreadcrumbItem>
              <Link href={'/services'} className='text-white text-lg'>
                Services
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={`text-white  ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <BreadcrumbItem>
              <div className='text-white text-lg'>{data ? product?.name : <Skeleton className='w-[70px] h-4' />}</div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='pt-[140px] w-[564px] py-[175px] text-white space-y-4'>
          {data ? (
            <h1 className='pb-2 text-[32px] font-semibold'> {product?.name}</h1>
          ) : (
            <Skeleton className='w-[100px] h-14' />
          )}
          {data ? (
            <p>{product?.description}</p>
          ) : (
            <div className='flex flex-col gap-3'>
              <Skeleton className='w-[200px] h-4' />
              <Skeleton className='w-[200px] h-4' />
              <Skeleton className='w-[200px] h-4' />
            </div>
          )}
          {data && (
            <Link href={`/login`}>
              <Button className='bg-white text-primary hover:text-white  mt-12'>
                Get started
                <ClientIcon icon='fa6-solid:chevron-right' fontSize={14} className='mx-2' />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
