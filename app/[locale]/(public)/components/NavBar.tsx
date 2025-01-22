'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Link } from '@/navigatios'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { LanguageSwitcher } from '../../(auth)/login/SignInForm'

export function NavBar() {
  const { data } = useSession()
  const t = useTranslations('navBar')

  return (
    <header
      className='sticky top-0 z-50 w-full bg-white h-[76px] dark:bg-gray-950 '
      style={{ boxShadow: '0px 4px 10px 0px #0000000A' }}
    >
      <div className='container mx-auto flex h-[76px] items-center justify-between '>
        <div className='flex items-center gap-2'>
          <Sheet>
            <SheetTrigger asChild>
              <Button className='md:hidden' size='icon' variant='outline'>
                <MenuIcon className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <nav className='mt-6 space-y-2'>
                <Link className='flex items-center gap-2 text-sm font-medium hover:underline' href='/'>
                  {t('home')}
                </Link>
                <Link className='flex items-center gap-2 text-sm font-medium hover:underline' href='#'>
                  {t('our-offering')}
                </Link>
                <Link className='flex items-center gap-2 text-sm font-medium hover:underline' href='/services'>
                  {t('products')}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link className='flex items-center gap-2 text-lg font-semibold' href='/'>
            <Image width={80} height={30} alt='' src='/khayyal_K_logo.png' className='object-contain' />
          </Link>
        </div>
        <nav className='hidden md:gap-12 md:flex'>
          <Link className='font-medium hover:underline' href='/'>
            {t('home')}
          </Link>

          <Link className='font-medium hover:underline' href='/services'>
            {t('products')}
          </Link>
        </nav>
        <div className='flex items-center gap-4'>
          <LanguageSwitcher />
          {data?.user ? (
            <>
              <Button variant={'outline'} onClick={() => signOut()}>
                Sign out
              </Button>
              <Link href={'/dashboard'}>
                <Button className='flex gap-2'> {t('dashboard')}</Button>
              </Link>
            </>
          ) : (
            <>
              <Link className='text-sm font-medium hover:underline' href='/login'>
                <Button variant='outline' className='font-semibold text-base w-[124px]'>
                  Login
                </Button>
              </Link>
              <Link className='text-sm font-medium hover:underline' href='/sign-up'>
                <Button className='font-semibold text-base w-[141px]'>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}
