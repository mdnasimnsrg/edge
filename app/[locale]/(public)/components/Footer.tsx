import { ClientIcon } from '@/components/ui/ClitentIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'

export async function Footer() {
  const locale = await getLocale()

  return (
    <footer className=' bg-primary h-[290px]'>
      <div className='container flex justify-between items-center h-full py-12'>
        <div className='flex flex-col items-start h-full'>
          <Image src='/khayyal_K_logo.png' alt='' className='object-contain' width={60} height={80} />
          <div>
            <p className='text-white'>Follow Us</p>
            <div className='flex gap-6 pt-4'>
              <div className='rounded-full bg-white h-8 w-8 flex items-center justify-center'>
                <Image src='/social/instagram.svg' alt='' className='object-contain' width={16} height={16} />
              </div>
              <div className='rounded-full bg-white h-8 w-8 flex items-center justify-center'>
                <Image src='/social/facebook.svg' alt='' className='object-contain' width={16} height={16} />
              </div>
              <div className='rounded-full bg-white h-8 w-8 flex items-center justify-center'>
                <Image src='/social/x.svg' alt='' className='object-contain' width={16} height={16} />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-start items-start flex-col gap-4 h-full pt-[22px]'>
          <p className='text-[22px] font-semibold text-white'>Contact Us</p>
          <p className='text-white flex items-center gap-3'>
            <ClientIcon icon='fa:phone' />
            (912)- 8080800
          </p>
          <p className='text-white flex items-center gap-3'>
            <ClientIcon icon='heroicons-solid:mail' />
            adminedge@edgeworld.com.sa
          </p>
        </div>
        <div className='flex  h-full flex-col items-start pt-[22px] gap-6'>
          <p className='text-[22px] font-semibold text-white capitalize'>join our newsletter</p>
          <div className='relative w-[400px] rounded-[5px] h-14 bg-white'>
            <Input
              placeholder='Email Address'
              className='h-full ps-4 border-0 ring-0 focus-visible:ring-0 focus-visible:border-0 placeholder:text-primary-foreground'
            />
            <Button className={`absolute top-1/2 -translate-y-1/2 ${locale === 'en' ? 'right-2' : 'left-2'}`}>
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
      <div className='h-[43px] bg-white flex items-center justify-center'>
        <p>
          <span className='text-secondary-foreground'>{new Date().getFullYear()}</span> © EDGE WORLD
        </p>
      </div>
    </footer>
  )
}
