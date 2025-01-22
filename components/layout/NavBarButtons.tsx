'use client'
import { IProfile } from '@/@types/api/interfaces'
import { USERS_ENDPOINT } from '@/endpoints/users'
import { useRequester } from '@/hooks/useRequester'
import { Icon } from '@iconify/react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export default function NavBarButtons() {
  return (
    <>
      <Button variant={'ghost'} className='rounded-full p-2 bg-[#eff3f8] w-10 h-10'>
        <Icon icon='solar:settings-outline' className='text-primary text-2xl' />
      </Button>
      <Button variant={'ghost'} className='rounded-full p-2 bg-[#eff3f8] w-10 h-10'>
        <Icon icon='codicon:bell' className='text-primary text-2xl' />
      </Button>
    </>
  )
}

export function LogoutButton() {
  const { data: userProfile, isFetching } = useRequester<IProfile>({
    endpoint: USERS_ENDPOINT.getProfile,
    options: { queryKey: ['userProfile'] }
  })

  return (
    <div className='rounded-full  bg-[#eff3f8] hover:bg-gray-100 overflow-hidden shadow-[0px_1px_5px_0px_rgba(0, 0, 0, 0.25)] border border-white'>
      {isFetching ? (
        <Skeleton className='w-10 h-10 rounded-full' />
      ) : (
        <img src={userProfile?.avatar} className='w-10 h-10 rounded-full object-cover' alt='avatar' />
      )}
    </div>
  )
}
