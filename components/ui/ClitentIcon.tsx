'use client'
import { Icon, IconProps } from '@iconify/react'
import { Suspense } from 'react'

type clientIcon = { icon: string } & IconProps
export function ClientIcon({ icon, ...props }: clientIcon) {
  return (
    <Suspense fallback={<div className='h-8 w-8 bg-red-200'></div>}>
      <Icon {...props} icon={icon} />
    </Suspense>
  )
}
