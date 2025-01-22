'use client'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { cva, type VariantProps } from 'class-variance-authority'

const cardWrapperVariants = cva('bg-white w-full h-full rounded-[8px] flex flex-col p-6 shadow-custom', {
  variants: {
    variant: {
      page: 'h-full bg-transparent border-none px-2 py-0'
    }
  }
})
interface CardWrapperProps {
  action?: React.ReactNode
  children: React.ReactNode
  title?: React.ReactNode
  className?: string
  description?: string
  isLoading?: boolean
  isEmpty?: boolean
  icon?: string
}

export interface Props extends CardWrapperProps, VariantProps<typeof cardWrapperVariants> {}

export default function CardWrapper({
  children,
  title,
  className,
  action,
  description,
  isLoading = false,
  isEmpty = false,
  icon,
  variant
}: Props) {
  return (
    <div className={cn(cardWrapperVariants({ variant }), className)}>
      <div className='flex justify-between pb-4'>
        <div className={`flex justify-between w-full items-center `}>
          {typeof title == 'string' ? <p className='font-medium text-lg'>{title}</p> : title}
          <div>{action}</div>
        </div>
      </div>
      <div>
        {description && <p className='text-base text-gray-500'>{description}</p>}
        {icon && <Icon icon={icon} />}
      </div>
      {
        <div className='flex-1 '>
          {isLoading ? (
            <LoadingSpinner />
          ) : isEmpty ? (
            <div className='flex justify-center items-center h-full'>
              <p className='text-gray-400 font-normal'>No Data</p>
            </div>
          ) : (
            children
          )}
        </div>
      }
    </div>
  )
}
