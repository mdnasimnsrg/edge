import Image from 'next/image'
import { SeeMoreCard } from './SeeMoreCard'

export function SeeMoreSection() {
  return (
    <section className='bg-white h-[587px] py-[100px] relative'>
      <Image
        src='/landing/seemore-background.svg'
        alt=''
        width={1228}
        height={770}
        className='absolute top-[100px] right-1/2 translate-x-1/2'
      />
      <div className='container flex flex-col items-center'>
        <button className='text-sm text-black border border-black inline-block py-2 px-5 rounded-md font-semibold'>Learn More</button>
        <div className='flex gap-6 pt-12'>
          <SeeMoreCard
            title='FAQ'
            image='/landing/FAQ.png'
            description='Want to know about pricing, market coverage or Rabet’s license?  Our FAQ section has got you covered!'
            CTAText='View FAQ'
            href='/#faqs'
          />
          <SeeMoreCard
            title='Get API keys'
            image='/landing/APIKey.png'
            description='Create /an account and start building or prototyping with Rabet’s API right away.'
            CTAText='Create Account'
            href='/'
          />
          <SeeMoreCard
            title='Test our service'
            image='/landing/Test.png'
            description='Get immediate access to our sandbox environment and start exploring the limitless possibilities with our APIs!'
            CTAText='Try Demo'
            href='/try-out'
          />
        </div>
      </div>
    </section>
  )
}
