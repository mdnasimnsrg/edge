import { Icon } from '@iconify/react'

export function Stepper({ step }: { step: number }) {
  return (
    <div className='h-28 border-b p-8 flex gap-6'>
      <Step title='Profile' description='Profile Info' number={1} active={step >= 1} />
      <Step title='Individual' description='Individual Info' number={2} active={step >= 2} />
      <Step title='Consumer' description='Consumer Info' number={3} active={step >= 3} />
      <Step title='Confirm' description='Confirm account' number={4} active={step >= 4} />
    </div>
  )

  return (
    <div className='flex w-[700px] max-w-3xl items-center justify-between py-6'>
      <div className='flex flex-col items-center'>
        <div
          className={`relative mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
            step >= 1 ? 'bg-primary' : 'bg-gray-900'
          } text-gray-50 dark:bg-gray-50 dark:text-gray-900`}
        >
          {step > 1 ? (
            <Icon icon='mingcute:check-line' fontSize={20} />
          ) : (
            <Icon icon='mdi:card-account-details' fontSize={20} />
          )}
        </div>
        <div className='text-sm font-medium'>
          <span className='text-gray-900 dark:text-gray-50'>Step 1</span>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Create your account</p>
      </div>
      <div className='flex-1 border-t border-gray-200 dark:border-gray-800' />
      <div className='flex flex-col items-center'>
        <div
          className={`relative mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
            step >= 2 ? 'bg-primary' : 'bg-gray-900'
          } text-gray-50 dark:bg-gray-50 dark:text-gray-900`}
        >
          {step > 2 ? (
            <Icon icon='mingcute:check-line' fontSize={20} />
          ) : (
            <Icon icon='radix-icons:person' fontSize={20} />
          )}
        </div>
        <div className='text-sm font-medium'>
          <span className='text-gray-900 dark:text-gray-50'>Step 2</span>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Basic Information</p>
      </div>
      <div className='flex-1 border-t border-gray-200 dark:border-gray-800' />
      <div className='flex flex-col items-center'>
        <div
          className={`relative mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
            step >= 3 ? 'bg-primary' : 'bg-gray-900'
          } text-gray-50 dark:bg-gray-50 dark:text-gray-900`}
        >
          <Icon icon='octicon:organization-24' fontSize={20} />
        </div>
        <div className='text-sm font-medium'>
          <span className='text-gray-900 dark:text-gray-50'>Step 3</span>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Organization Information</p>
      </div>
    </div>
  )
}

function Step({
  title,
  description,
  number,
  active
}: {
  title: string
  description: string
  number: number
  active: boolean
}) {
  return (
    <div className='flex gap-3 items-center'>
      <div
        className={`h-[42px] w-[42px] transition-all duration-300 ${
          active ? 'bg-[#fae0c0] text-[#ED972B]' : 'bg-[#f1f5f9]'
        }  rounded-md text-center flex items-center justify-center font-medium text-[22px]`}
      >
        {number}
      </div>
      <div>
        <p className='text-lg font-medium'>{title}</p>
        <p className={active ? '' : 'text-[#94A3B8]'}>{description}</p>
      </div>
      {number < 4 && (
        <div className='w-8 h-8 flex items-center justify-center'>
          <Icon icon='fa6-solid:angle-right' color={active ? '#ED972B' : '#cbd5e1'} />
        </div>
      )}
    </div>
  )
}
