'use client'
import { IProduct } from '@/@types/api/interfaces'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { PRODUCTS_ENDPOINT } from '@/endpoints/products'
import { useRequester } from '@/hooks/useRequester'
import { Link } from '@/navigatios'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export function AboutSection() {
  const params = useParams()
  const { data, isPending } = useRequester<IProduct[]>({
    endpoint: PRODUCTS_ENDPOINT.getAll
  })

  const product = data && data?.filter(product => product.id === Number(params.id))[0]

  return (
    <section className='pb-[100px] pt-[64px] px-8 flex justify-start gap-[30px] relative overflow-hidden bg-[#eef6f6]'>
      <Image
        src='/products/serviceslines.svg'
        className='absolute -bottom-[150px] right-0'
        alt=''
        width={180}
        height={150}
      />

      {isPending ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div className='h-[160px] w-[160px] rounded-full bg-white border-2 border-primary flex justify-center items-center overflow-hidden'>
            <img src={product?.imageUrl} width={251} height={251} alt='' className='object-contain p-3' />
          </div>
          <div>
            <h1 className='pb-2 text-[32px] font-semibold'> 
              {product?.prettyName?product.prettyName:product?.name.replace(/[_-]/g," ")}
            </h1>
            <p className='max-w-[636px] pt-4 pb-10'>{product?.description}</p>
            <Link href={`/dashboard/services/${params.id}#apis`}>
              <Button className='w-[172px]'>Try Test</Button>
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

export function DetailsCard({ title, description }: { title: string; description: string }) {
  return (
    <div className={`flex items-start gap-3  ${title !== 'Target' ? 'border-r border-dashed border-primary' : ''}`}>
      <div>
        <ClientIcon icon='fa-solid:check-circle' fontSize={24} className='text-primary' />
      </div>
      <div className='flex justify-start-start flex-col w-[226px]'>
        <h2 className='font-semibold'>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
