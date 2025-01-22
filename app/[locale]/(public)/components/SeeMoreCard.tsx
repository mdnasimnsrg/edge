import { ClientIcon } from '@/components/ui/ClitentIcon'
import { Link } from '@/navigatios'
import Image from 'next/image'

export function SeeMoreCard({
  title,
  description,
  image,
  CTAText,
  href
}: {
  title: string
  description: string
  image: string
  CTAText: string
  href: string
}) {
  return (
    <div className='w-full shadow-md p-6 rounded bg-white flex flex-col justify-center items-center'>
      <Image src={image} width={64} height={64} alt='' className='object-contain' />
      <p className='text-[22px] font-medium py-4'>{title}</p>
      <p className='pb-6'>{description}</p>
      {
        <Link href={href}>
          <div className='flex items-center gap-3 cursor-pointer '>
            <div className='bg-primary h-8 w-8 rounded flex items-center justify-center text-white'>
              <ClientIcon icon='fa6-solid:chevron-right' fontSize={14} className='mx-2' />
            </div>
            <p className='text-primary font-medium'>{CTAText}</p>
          </div>
        </Link>
      }
    </div>
  )
}
