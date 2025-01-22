'use client'
import { CustomIcon } from '@/components/custom/custom-icon'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'

interface Props {
  tabs: {
    trigger: { name: string; description?: React.ReactNode; icon?: string; iconColor?: string }
    icon?: string
    component: React.ReactNode
    tabName?: string
  }[]
  activeTab?: string
  urlParams?: boolean
}
const TabsWrapper = ({ tabs, activeTab, urlParams }: Props) => {
  const router = useRouter()

  const activeTabIndex =
    tabs.findIndex(tab => tab.tabName === activeTab) !== -1 ? tabs.findIndex(tab => tab.tabName === activeTab) : 0

  if (urlParams) {
    return (
      <Tabs
        value={String(activeTabIndex)}
        defaultValue='0'
        className='h-full w-full '
        onValueChange={e => {
          if (tabs[parseInt(e)].tabName) {
            router.push(`?tab=${tabs[parseInt(e)].tabName}`)
          }
        }}
      >
        <TabsList className='mb-4 shadow-[inset_0px_-3px_0px_0px_rgba(229,231,235,1)] dark:border-gray-700 bg-white rounded-sm overflow-hidden '>
          {tabs.map(({ trigger }, index) => (
            <TabsTrigger
              key={index}
              value={`${index}`}
              className='[&>div>div>p]:data-[state=active]:font-semibold  [&>div>div>p]:data-[state=active]:text-[#15294b] [&>*:first-child>:first-child]:data-[state=active]:text-[#000] data-[state=active]:border-b-[3px] data-[state=active]:border-[#715EE9] py-3 px-2'

              // className='[&>*:first-child>:first-child]:data-[state=active]:bg-[#715EE9] [&>*:first-child>:first-child]:data-[state=inactive]:text-[#8993A4] inline-block p-2 border-b-2 border-transparent rounded-md dark:hover:text-gray-300 data-[state=active]:bg-[#523be4] data-[state=active]:text-white'
            >
              <div className='flex gap-2 px-2'>
                {trigger.icon && (
                  <div className='w-6 h-6 p-1  rounded-[4px] flex justify-center items-center '>
                    <CustomIcon icon={trigger.icon} size='medium' iconColor={trigger.iconColor} noBackground />
                  </div>
                )}
                <div className='flex flex-col justify-center items-start'>
                  <p className='font-normal text-sm'>{trigger.name}</p>
                  {trigger.description && <div className='text-[#8b8399] text-sm'>{trigger.description}</div>}
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(({ component }, index) => (
          <TabsContent value={`${index}`} key={index} className=' mt-0 h-[calc(100%-60px)]'>
            {component}
          </TabsContent>
        ))}
      </Tabs>
    )
  }

  return (
    <Tabs
      defaultValue={`0`}
      className='w-ful'
      onValueChange={e => {
        if (tabs[parseInt(e)].tabName) {
          router.push(`?tab=${tabs[parseInt(e)].tabName}`)
        }
      }}
    >
      <TabsList className='mb-4 shadow-[inset_0px_-3px_0px_0px_rgba(229,231,235,1)] dark:border-gray-700 bg-white rounded-sm overflow-hidden '>
        {tabs.map(({ trigger }, index) => (
          <TabsTrigger
            key={index}
            value={`${index}`}
            className='[&>div>div>p]:data-[state=active]:font-semibold  [&>div>div>p]:data-[state=active]:text-[#15294b] [&>*:first-child>:first-child]:data-[state=active]:text-[#000] data-[state=active]:border-b-[3px] data-[state=active]:border-[#715EE9] py-3 px-2'

            // className='[&>*:first-child>:first-child]:data-[state=active]:bg-[#715EE9] [&>*:first-child>:first-child]:data-[state=inactive]:text-[#8993A4] inline-block p-2 border-b-2 border-transparent rounded-md dark:hover:text-gray-300 data-[state=active]:bg-[#523be4] data-[state=active]:text-white'
          >
            <div className='flex gap-2 px-2'>
              {trigger.icon && (
                <div className='w-6 h-6 p-1  rounded-[4px] flex justify-center items-center '>
                  <CustomIcon icon={trigger.icon} size='medium' iconColor={trigger.iconColor} noBackground />
                </div>
              )}
              <div className='flex flex-col justify-center items-start'>
                <p className='font-normal text-sm text-[#505f8f]'>{trigger.name}</p>
                {trigger.description && <div className='text-[#8b8399] text-sm'>{trigger.description}</div>}
              </div>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ component }, index) => (
        <TabsContent value={`${index}`} key={index} className=' mt-0'>
          {component}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsWrapper
