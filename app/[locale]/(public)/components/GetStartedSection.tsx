import { Button } from '@/components/ui/button'
import { Link } from '@/navigatios'
import Image from 'next/image'
import { SectionTitle } from './SectionTitle'

const timeLineSteps = [
  'Step 1: Register Your Account.',
  'Step 2: Define Your API Services.',
  'Step 3: Set Your Pricing Strategy,',
  'Step 4: Enable Secure Access.',
  'Step 5: Launch Your Developer Portal.',
  'Step 6: Monitor and Optimize Usage',
  'Step 7: Scale Your Monetization Efforts.',
  'Step 8: Ensure Compliance.'

]
export function GetStartedSection() {
  return (
    <section className='bg-[#f6f6f6] py-[100px] relative'>
      <div className='container flex flex-col items-center'>
        <button className='text-sm text-black border border-black inline-block py-2 px-5 rounded-md font-semibold'>Initiate Now</button>
        <p className='font-medium text-[40px] pt-3 text-center'>
        Embark on Your Monetization Journey with Edge's Monetization Solution
        </p>
        
        <div className='flex justify-between gap-6 pt-16 container'>
          <div className='flex flex-col text-xl'>
            {timeLineSteps.map((step, index) => (
              <TimeLineItem key={index} name={step} order={index} />
            ))}

            <Link href={'/sign-up'} className='pt-8'>
              <Button>Launch Now</Button>
            </Link>
          </div>
          <Image src={'/landing/Registration.png'} width={529} height={337} alt='Get Started' />
        </div>
      </div>
    </section>
  )
}

function TimeLineItem({ name, order }: { name: string; order: number }) {
  return (
    <div className='flex gap-3 items-center relative h-[54px]'>
      <div
        className={`absolute left-[12px] top-1/2  h-full ${
          order === timeLineSteps.length - 1 ? 'hidden' : ' '
        }`}
      />
      {/* <Image src='landing/timelinedot.svg' width={24} height={24} alt='Get Started' className='z-10' /> */}
      <p>{name}</p>
    </div>
  )
}
