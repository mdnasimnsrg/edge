'use client'
import { IProduct, ISubscription } from '@/@types/api/interfaces'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/navigatios'

export function ServiceCard({ product, tryout }: { product: IProduct; tryout?: boolean }) {
  const pathName = usePathname()


  return (
    <div
      className='w-full px-6 bg-white py-8 rounded flex flex-col justify-between'
      style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}
    >
      <div>
        <div className='flex justify-center'>
          <img src={product?.imageUrl} width={80} height={80} alt='' className='object-contain h-[80px] w-[80px]' />
        </div>
        <p className='text-2xl font-medium py-4'>{product?.name}</p>
        <p className='pb-6'>{product?.description}</p>
      </div>
      {tryout ? (
        <div className='flex flex-1 justify-between items-center'>
          <Link href={`/try-out/${product?.id}`}>
            <Button className='w-[157px]'>Try it Now</Button>
          </Link>
          <Link href={`/services/${product?.id}`}>
            <p className='text-primary font-medium'>View Service</p>
          </Link>
        </div>
      ) : (
        <Link
          href={pathName.includes('/dashboard') ? `/dashboard/services/${product?.id}` : `/services/${product?.id}`}
        >
          <div className='flex items-center gap-3 cursor-pointer'>
            <div className='bg-primary h-8 w-8 rounded flex items-center justify-center text-white'>
              <ClientIcon icon='fa6-solid:chevron-right' fontSize={14} className='mx-2' />
            </div>
            <p className='text-primary text-xl'>View Service</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export function ServiceCardV2({ product, subscriptions }: { product: IProduct; subscriptions?: ISubscription[] }) {
  const pathName = usePathname()

  const isSubscribed = subscriptions?.some(sub => sub.plan.product.name === product?.name)

  return (
    <div className='flex gap-4 border border-[#d9d9d9] bg-white p-6 rounded-sm relative w-full '>
      {isSubscribed && (
        <div className='absolute end-0 top-0 px-3 py-1 bg-secondary text-white rounded-bl flex items-center justify-center '>
          <p className='font-medium text-sm'>Subscribed</p>
        </div>
      )}
      <div className=' h-[88px] w-[88px] rounded-full border border-input overflow-hidden flex justify-center items-center p-2'>
          <img src={product?.imageUrl} alt='' className='object-contain ' />
        </div>
        <div className='flex flex-col justify-between w-[367px]'>
          <div>
            <p className='text-lg font-medium'>
              {product?.prettyName?product.prettyName:product.name.replace(/[_-]/g," ")}
            </p>
            <p className='text-base mt-2'>
              {product?.description?.slice(0, 120)} {product?.description?.length > 120 ? '...' : ''}
            </p>
          </div>
          <Link
            href={pathName.includes('/dashboard') ? `/dashboard/services/${product?.id}` : `/services/${product?.id}`}
          >
            <div className='flex items-center gap-3 cursor-pointer mt-4'>
              <div className='bg-primary h-6 w-6 rounded flex items-center justify-center text-white'>
                <ClientIcon icon='fa6-solid:chevron-right' fontSize={14} className='mx-2' />
              </div>
              <p className='text-primary text-base '>View Service</p>
            </div>
          </Link>
        </div>
    </div>
  )
}
