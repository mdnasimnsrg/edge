'use client'
import ControlledInput from '@/components/controlled/ControlledInput'
import { Fa6SolidCheck, FaAngleDown, GlobalIcon } from '@/components/icons/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { Link, usePathname, useRouter } from '@/navigatios'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { usePathname as nextUsePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'

export function SignInForm() {
  const t = useTranslations('LoginPage')
  const router = useRouter()
  const { control, handleSubmit, reset } = useForm({
    values: { userName: 'TechSpheres2306', password: 'strongPasswordv02' }
  })
  const pathName = nextUsePathname()
  const { toast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const res = await signIn('credentials', {
        userName: values.userName,
        password: values.password,
        callbackUrl: '/dashboard',
        redirect: false
      })
      if (!res?.ok) throw new Error(res?.error as any)
    },
    onError: e => {
      toast({
        variant: 'destructive',
        description:
          e.message == 'User account is locked' ? 'Your account is locked due to multiple failed login attempt' : '',
        title: e.message
      })
    },
    onSuccess: () => {
      toast({ variant: 'success', description: 'Logged in successfully', title: 'Welcome back !' })
      router.push('/dashboard')
    },
    onSettled: () => {
      reset()
    }
  })

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <div className='flex flex-col items-start container h-full '>
        <nav className='flex gap-[58px]'>
          <Link href={'/'}>
            <img src='/khayyal_K_logo.png' className=' object-fit w-[80px] h-[35px] py-2' alt='' />
          </Link>
          <LanguageSwitcher />
        </nav>
        <div className='h-full flex items-center justify-center w-[min(50vw,700px)]'>
          <div className=' w-[440px] flex flex-col  gap-6  z-50'>
            <p className='text-[28px] font-semibold pb-2 '>{t('title')}</p>
            <div>
              <form onSubmit={handleSubmit((e: any) => mutate(e))} className='grid gap-4'>
                <div className='flex flex-col'>
                  <ControlledInput control={control} name='userName' label={t('Username')} />
                  <div className='flex flex-col'>
                    <ControlledInput control={control} name='password' label='Password' isPassword />
                    <div className='flex items-center justify-between w-full'>
                      <div className='flex gap-2 text-sm text-[#94A3B8] items-center'>
                        <Checkbox id='rememberPassword' />
                        <label className='cursor-pointer' htmlFor='rememberPassword'>
                          {t('rememberMe')}
                        </label>
                      </div>
                      <Link href='/forgot-password' className='text-sm text-primary'>
                        {t('forgotPassword')}
                      </Link>
                    </div>
                  </div>
                </div>
                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? <Icon icon='line-md:loading-twotone-loop' fontSize={24} /> : t('signIn')}
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
        className={`w-[530px] absolute top-0  origin-bottom ${
          pathName.includes('/en') ? 'right-0 -skew-x-3' : 'left-0 skew-x-3'
        }`}
      >
        {/* <img src='/login-image.png' alt='' className='object-fit h-screen' /> */}
      </div>
      <div className={`absolute top-[200px] ${pathName.includes('/en') ? 'right-[29px]' : 'left-[29px]'}`}>
        <p className='font-bold text-[#2d9866] text-[54px] '>
          <span className='leading-8'>Edge Monetization <br></br> Engine</span>
        </p>
        <p className='text-black text-[32px] font-medium w-[450px] '>{t('empoweringConnectionsProtectingData')}</p>
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
        {/* <Link href={intlPathName} locale='ar' className='flex gap-2'>
          عربي
          {pathName.includes('ar') && <Fa6SolidCheck />}
        </Link> */}
      </PopoverContent>
    </Popover>
  )
}
