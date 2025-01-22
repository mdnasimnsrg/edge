'use client'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { sideBarItems } from '@/config/side-bar-items'
import { Link, usePathname } from '@/navigatios'
import { Icon } from '@iconify/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

export default function Sidebar() {
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const pathName = usePathname()

  return (
    <aside
      className={` relative bg-[#017165] flex-shrink-0 ease-in-out duration-300 overflow-hidden ${
        sideBarOpen ? 'w-[250px]' : 'w-[70px]'
      }`}
    >
      <div className='flex justify-end gap-[44px] items-center pt-3 px-4 h-[72px]'>
        {sideBarOpen && (
          <Link href={'/'}>
            <Image src={'/logo-white.svg'} alt='' width={122} height={52} className='object-contain' />
          </Link>
        )}
        <Button
          variant={'ghost'}
          className='rounded-full p-0 bg-gray-50 h-7 w-7 flex-shrink-0 '
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          <Icon
            icon={sideBarOpen ? 'iconamoon:arrow-left-2' : 'iconamoon:arrow-right-2'}
            className='text-[#017165] '
            fontSize={22}
          />
        </Button>
      </div>
      <div className='pt-[40px] z-10'>
        {sideBarItems.map(item => {
          const { name, iconPath, selectedIconPath, path } = item

          return sideBarOpen ? (
            <Link shallow={false} href={path}>
              <div
                className={`h-[50px] relative mb-1 ps-10 py-2 w-full flex gap-6 items-center  hover:bg-[#ebf9f7]/10 ${
                  pathName == path ? 'text-primary bg-[#ebf9f7]/10 ' : 'text-[#8fa8c1]'
                }`}
              >
                <Image src={pathName == path ? selectedIconPath : iconPath} alt='' width={32} height={32} />
                <p className={`text-lg text-white`}>{name}</p>
                {pathName == path && (
                  <div className='h-full w-[6px] bg-white absolute left-0 rounded-br-full rounded-tr-full' />
                )}
              </div>
            </Link>
          ) : (
            <Tooltip key={name} delayDuration={100}>
              <TooltipTrigger asChild>
                <Link shallow={false} href={path}>
                  <div
                    className={`relative ps-5 py-2 w-full flex gap-3 items-center  hover:bg-[#ebf9f7]/10 ${
                      pathName == path ? 'text-primary font-semibold bg-[#ebf9f7]/10' : 'text-[#8fa8c1]'
                    }`}
                  >
                    <Image src={pathName == path ? selectedIconPath : iconPath} alt='' width={24} height={24} />
                    {pathName == path && (
                      <div className='h-full w-[5px] bg-white absolute left-0 rounded-br-full rounded-tr-full' />
                    )}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>
                {/* @ts-ignore */}
                <p>{sideBarItems.find(item => item?.path === path)?.name}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
      {sideBarOpen ? (
        <div
          onClick={() => signOut()}
          className={` z-10 relative cursor-pointer mb-1 ps-10 py-2 w-full flex gap-6 items-center text-white hover:bg-[#ebf9f7]/10 `}
        >
          <Image src={'/icons/sidebar/logout.svg'} alt='' width={30} height={30} />
          <p className={`text-lg `}>Logout</p>
        </div>
      ) : (
        <>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <div
                className={`relative ps-5 py-2 w-full flex gap-3 items-center  hover:bg-[#ebf9f7]/10`}
                onClick={() => signOut()}
              >
                <Image src={'/icons/sidebar/logout.svg'} alt='' width={24} height={24} />
              </div>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>Sign out</p>
            </TooltipContent>
          </Tooltip>
        </>
      )}
      <Image
        src={'/sidebar/sidebarlines.svg'}
        alt=''
        width={200}
        height={200}
        className='object-contain absolute -bottom-10 left-0 '
      />
    </aside>
  )
}
