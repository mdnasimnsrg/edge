'use client'
import { useRouter } from '@/navigatios'
import { Icon } from '@iconify/react'
import Image from 'next/image'

export default function ErrorPage() {
  const router = useRouter()

  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <p className='text-[64px] font-bold'>Error 404!</p>
      <p className='text-2xl font-[#002623] '>Page Not Found</p>
      <Image src={'/404.png'} width={550} height={366} alt='' className='py-16' />
      <div
        className='text-primary border-b border-primary items-center gap-2 flex cursor-pointer'
        onClick={window.history.state && window.history.state.idx > 0 ? () => router.back() : () => router.push('/')}
      >
        <Icon icon='system-uicons:wrap-back' fontSize={24} />
        Go Back
      </div>
    </main>
  )
}
