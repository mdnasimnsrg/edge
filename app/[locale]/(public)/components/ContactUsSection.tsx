'use client'
import ControlledInput from '@/components/controlled/ControlledInput'
import ControlledTextArea from '@/components/controlled/ControlledTextArea'
import { ClientIcon } from '@/components/ui/ClitentIcon'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { SectionTitle } from './SectionTitle'

export function ContactUsSection() {
  const { control } = useForm({})
  const locale = useLocale()

  return (
    <section className='h-[840px] bg-[#009d89] relative  overflow-hidden'>
      <div className='w-[2064px] h-[698px] absolute top-[100px] right-1/2 translate-x-1/2'>
        <Image src='/landing/contactus-background.svg' alt='' fill />
      </div>
      <div className='container py-[100px] flex flex-col items-center justify-center'>
        <SectionTitle title='Contact Us' variant='white' />
        <p className='text-[54px] font-medium text-white pb-[65px] pt-3'>Do You Have a Question For Us?</p>
        <div className='relative container'>
          <div className='bg-white w-full h-[365px] rounded-lg p-9 shadow-lg '>
            <div className='w-[458px] '>
              <p className='text-4xl font-semibold pb-2'>Get In Touch</p>
              <p>Questions, comments, or suggestions? Simply fill in the form and we’ll be in touch shortly.</p>
              <div className='pt-8 space-y-6'>
                <div className='flex gap-2 items-start'>
                  <ClientIcon className='text-primary' width={21} height={21} icon='fa-solid:map-marker-alt' />
                  <p>11 Sayed Al Shouhada, Al Masani Al Munawwarah, Al Madinah 42313</p>
                </div>
                <div className='flex gap-2'>
                  <ClientIcon className='text-primary' width={21} height={21} icon='fa:phone' />
                  (+966)563823920
                </div>
                <div className='flex gap-2'>
                  <ClientIcon className='text-primary' width={21} height={21} icon='heroicons-solid:mail' />
                  Rabet@company.com
                </div>
              </div>
            </div>
          </div>
          <div
            className={`h-[413px] w-[500px] bg-white absolute top-1/2 -translate-y-1/2 rounded-[20px] shadow-lg z-10 p-8 flex flex-col gap-6 ${
              locale == 'en' ? 'right-0' : 'left-0'
            }`}
          >
            <ControlledInput control={control} name='name' placeholder='Name' className='h-fit' />
            <ControlledInput control={control} name='phone' placeholder='Phone' className='h-fit' />
            <ControlledInput control={control} name='email' placeholder='Email' className='h-fit' />
            <ControlledTextArea control={control} name='message' placeholder='Message' />
            <Button className='self-start w-[155px]'>Send</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
