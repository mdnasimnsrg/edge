'use client'
import ControlledInput from '@/components/controlled/ControlledInput'
import { Fa6SolidCheck, FaAngleDown, GlobalIcon } from '@/components/icons/icons'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { VALIDATION_REGEX } from '@/constants/validations'
import { AUTH_ENDPOINTS } from '@/endpoints/auth'
import { requester } from '@/lib/requester'
import { Link, usePathname } from '@/navigatios'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { usePathname as nextUsePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'

export function ForgetPasswordForm() {
  const t = useTranslations('ForgotPasswordPage')
  const { control, handleSubmit, reset } = useForm({ values: { email: '' } })
  const pathName = nextUsePathname()
  const { toast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      await requester({ endpoint: AUTH_ENDPOINTS.resetPassword, options: { params: { email: values.email } } })
    },
    onSettled: () => {
      reset()
      toast({ variant: 'success', description: 'please check your email', title: 'Email sent' })
    }
  })

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <div className='flex flex-col items-start container h-full '>
        <nav className='flex gap-[58px]'>
          <Link href={'/'}>
            <img src='/logo_light.svg' className=' object-fit w-[170px] h-[72px] py-2' alt='' />
          </Link>
          <LanguageSwitcher />
        </nav>
        <div className='h-full flex items-center justify-center w-[min(50vw,700px)]'>
          <div className=' w-[440px] flex flex-col  gap-6  z-50'>
            <p className='text-[28px] font-semibold pb-2 '>{t('title')}</p>
            <div>
              <form onSubmit={handleSubmit((e: any) => mutate(e))} className='grid gap-4'>
                <div className='flex flex-col'>
                  <ControlledInput
                    control={control}
                    name='email'
                    label={t('email')}
                    rules={{
                      required: { value: true, message: 'required' },
                      pattern: { value: VALIDATION_REGEX.email, message: 'Enter valid email' }
                    }}
                  />
                </div>
                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? <Icon icon='line-md:loading-twotone-loop' fontSize={24} /> : 'Send Code'}
                </Button>
              </form>
              <div className='mt-4 text-start text-sm font-medium'>
                {t('dontHaveAccount')} &nbsp;
                <Link href='/sign-up' className='text-primary'>
                  {t('createAccount')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-[530px] absolute top-0  bg-gradient-to-br from-[#037F6B] to-[#02AC9B] origin-bottom ${
          pathName.includes('/en') ? 'right-0 -skew-x-3' : 'left-0 skew-x-3'
        }`}
      >
        <img src='/login-image.png' alt='' className='object-fit h-screen' />
      </div>
      <div className={`absolute top-[200px] ${pathName.includes('/en') ? 'right-[29px]' : 'left-[29px]'}`}>
        <p className='font-bold text-white text-[54px] '>
          <span className='underline decoration-[#ED972B]'>Rabet</span>&nbsp;Platform
        </p>
        <p className='text-white text-[32px] font-medium w-[450px] '>{t('empoweringConnectionsProtectingData')}</p>
      </div>
    </div>
  )
}

export function LanguageSwitcher() {
  const pathName = nextUsePathname()
  const intlPathName = usePathname()

  return (
    <Popover>
      <PopoverTrigger className='flex items-center  text-primary gap-2 h-full'>
        <GlobalIcon fontSize={12} />
        <p className='font-medium'>{pathName.includes('en') ? 'English' : 'عربي'}</p>
        <FaAngleDown />
      </PopoverTrigger>
      <PopoverContent className='w-fit p-2 flex flex-col gap-3'>
        <Link href={intlPathName} locale='en' className='flex gap-2'>
          English
          {pathName.includes('en') && <Fa6SolidCheck />}
        </Link>
        <Link href={intlPathName} locale='ar' className='flex gap-2'>
          عربي
          {pathName.includes('ar') && <Fa6SolidCheck />}
        </Link>
      </PopoverContent>
    </Popover>
  )
}
