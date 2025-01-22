'use client'
import { IProfile } from '@/@types/api/interfaces'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { USERS_ENDPOINT } from '@/endpoints/users'
import { useRequester } from '@/hooks/useRequester'
import { Icon } from '@iconify/react'
import { signOut } from 'next-auth/react'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import NavBarButtons, { LogoutButton } from './NavBarButtons'
import { NavBarTitle } from './NavBarTitle'

export default function Navbar() {
  const { data: userProfile, isFetching } = useRequester<IProfile>({
    endpoint: USERS_ENDPOINT.getProfile
  })

  return (
    <nav className='h-[72px] w-full'>
      <div className='bg-white flex justify-between items-center px-10 h-[72px] z-50 w-full border-b border-gray-100 shadow-sm'>
        <NavBarTitle />
        <div className='flex gap-8'>
          <div className='bg-[#eff3f8] border-none rounded-[10px] flex px-4 py-2 gap-3 items-center w-[330px]'>
            <Icon icon='heroicons-solid:search' className='text-primary text-2xl' />
            <Input
              className='bg-[#eff3f8] border-none p-0 border h-[23px] border-input ring-0 focus-visible:ring-0 focus-visible:border-0 placeholder:text-secondary-foreground'
              placeholder='Search for something'
            />
          </div>
          <NavBarButtons />
          <div className='flex gap-2'>
            <div className='flex flex-col justify-between'>
              <div className='text-xs'>Hi,</div>
              {isFetching ? (
                <Skeleton className='h-4 w-[80px]' />
              ) : (
                <div className='font-medium'>{userProfile?.firstName}</div>
              )}
            </div>
            <Popover>
              <PopoverTrigger>
                <LogoutButton />
              </PopoverTrigger>
              <PopoverContent className='flex flex-col gap-2 w-[200px]'>
                <Button className='w-full' onClick={() => signOut()}>
                  sign out
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  )
}
