import { getLocale } from 'next-intl/server'
import Image from 'next/image'

export async function HeroSection() {
  const locale = await getLocale()

  return (
    <section className='relative overflow-hidden h-[1004px] bg-[#2d9866]'>
      <Image
        src={locale === 'en' ? '/landing/Edge2.png' : '/landing/Edge2.png'}
        alt=''
        width={1338}
        height={500}
        className={`absolute -top-4  ${
          locale === 'en' ? 'right-[calc(30%-30px)] translate-x-1/2' : 'left-[calc(50%-30px)] -translate-x-1/2'
        }`}
      />
      <div className='container'>
        <div className='pt-[252px] w-[564px] text-white space-y-5'>
          <p className='font-semibold text-[54px] leading-[74px]'>
          Monetize Your APIs with Edge World: Unlock New Revenue Streams
          </p>
          <p className='text-xl font-medium'>
          Transform your APIs from a cost center to a profit center with Edge’s API monetization platform. Our comprehensive solution empowers organizations to package, price, and distribute their APIs effectively, creating a seamless bridge between innovation and revenue.
          </p>
        </div>
      </div>
    </section>
  )
}
