'use client'

import { sideBarItems } from '@/config/side-bar-items'
import { usePathname } from '@/navigatios'

export function NavBarTitle() {
  const pathName = usePathname()

  return (
    //@ts-ignore
    <p className='text-xl text-primary font-semibold'>{sideBarItems.find(item => item.path == pathName)?.name}</p>
  )
}
