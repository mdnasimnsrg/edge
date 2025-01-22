import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function ControlledInput({
  name,
  control,
  label,
  rules,
  endIcon,
  type,
  isPassword,
  loading,
  startText,
  placeholder,
  astrict,
  disabled,
  className
}: {
  name: string
  control: any
  label?: string
  type?: 'password' | 'text' | 'number'
  rules?:
    | Omit<RegisterOptions<FieldValues, string>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
    | undefined
  endIcon?: string
  isPassword?: boolean
  loading?: boolean
  startText?: string
  astrict?: boolean
  placeholder?: string
  className?: string
  disabled?: boolean
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      rules={rules ? { ...rules } : { required: { value: true, message: `${label} is required` } }}
      name={name}
      control={control}
      render={({ field, formState: { isSubmitting }, fieldState: { error } }) => {
        return (
          <div className={cn('h-[84px]', className)}>
            <p className='pb-1 text-sm font-medium text-primary-foreground'>
              {label && label} {astrict && <span className='text-base text-destructive'>*</span>}
            </p>
            <div className='relative'>
              <Input
                {...field}
                disabled={disabled || isSubmitting}
                className={` ${startText ? 'ps-[10ch]' : ''}  ${
                  error ? 'border-destructive' : ''
                } disabled:bg-[#CBD5E1]`}
                placeholder={placeholder || label}
                type={type ? type : isPassword ? (showPassword ? 'text' : 'password') : 'text'}
              />
              {startText && <div className='absolute start-2 top-1/2 -translate-y-1/2'>{startText}</div>}
              {endIcon && (
                <div className='absolute end-2 top-1/2 -translate-y-1/2 '>
                  <Icon icon={endIcon} />
                </div>
              )}
              {loading && (
                <div className='absolute end-4 top-1/2 -translate-y-1/2  text-gray-400 text-sm'>
                  <LoadingSpinner size={24} />
                </div>
              )}
              {isPassword && setShowPassword && (
                <div
                  className='absolute end-2 top-1/2  -translate-y-1/2 cursor-pointer'
                  onClick={() => setShowPassword((prev: boolean) => !prev)}
                >
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.25em'
                      height='1.25em'
                      viewBox='0 0 256 256'
                      color='#94A3B8'
                    >
                      <path
                        fill='currentColor'
                        d='M243.66 126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87 72.22 170.7 52 128 52S56.13 72.22 39.17 89.18c-18.31 18.31-26.49 36.44-26.83 37.2a4.08 4.08 0 0 0 0 3.25c.34.77 8.52 18.89 26.83 37.2c17 17 46.14 37.17 88.83 37.17s71.87-20.21 88.83-37.17c18.31-18.31 26.49-36.43 26.83-37.2a4.08 4.08 0 0 0 0-3.25m-32.7 35c-23.07 23-51 34.62-83 34.62s-59.89-11.65-83-34.62A135.71 135.71 0 0 1 20.44 128A135.69 135.69 0 0 1 45 94.62C68.11 71.65 96 60 128 60s59.89 11.65 83 34.62A135.79 135.79 0 0 1 235.56 128A135.71 135.71 0 0 1 211 161.38ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 80a36 36 0 1 1 36-36a36 36 0 0 1-36 36'
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.25em'
                      height='1.25em'
                      viewBox='0 0 24 24'
                      color='#94A3B8'
                    >
                      <path
                        fill='currentColor'
                        d='M2.54 4.71L3.25 4L20 20.75l-.71.71l-3.34-3.35c-1.37.57-2.87.89-4.45.89c-4.56 0-8.5-2.65-10.36-6.5c.97-2 2.49-3.67 4.36-4.82zM11.5 18c1.29 0 2.53-.23 3.67-.66l-1.12-1.13c-.73.5-1.6.79-2.55.79C9 17 7 15 7 12.5c0-.95.29-1.82.79-2.55L6.24 8.41a10.64 10.64 0 0 0-3.98 4.09C4.04 15.78 7.5 18 11.5 18m9.24-5.5C18.96 9.22 15.5 7 11.5 7c-1.15 0-2.27.19-3.31.53l-.78-.78C8.68 6.26 10.06 6 11.5 6c4.56 0 8.5 2.65 10.36 6.5a11.47 11.47 0 0 1-4.07 4.63l-.72-.73c1.53-.96 2.8-2.3 3.67-3.9M11.5 8C14 8 16 10 16 12.5c0 .82-.22 1.58-.6 2.24l-.74-.74c.22-.46.34-.96.34-1.5A3.5 3.5 0 0 0 11.5 9c-.54 0-1.04.12-1.5.34l-.74-.74c.66-.38 1.42-.6 2.24-.6M8 12.5a3.5 3.5 0 0 0 3.5 3.5c.67 0 1.29-.19 1.82-.5L8.5 10.68c-.31.53-.5 1.15-.5 1.82'
                      ></path>
                    </svg>
                  )}
                </div>
              )}
            </div>

            {loading && (
              <div className='flex items-center mt-1'>
                <p className='text-xs whitespace-nowrap w-full '>Checking . . .</p>
              </div>
            )}
            {error && !loading && <p className='text-xs text-destructive pt-1'>{error.message}</p>}
          </div>
        )
      }}
    />
  )
}
