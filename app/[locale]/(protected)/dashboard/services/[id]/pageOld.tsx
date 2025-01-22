'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PageWrapper from '@/components/wrappers/page-wrapper'
import Image from 'next/image'
import { AboutSection } from './AboutSection'
import { DocumentationTab } from './DocumentationTab'
import { PlansTab } from './PlansTab'
import { TestAPI } from './TestAPI'

export function ProductOld() {
  return (
    <PageWrapper className='w-full'>
      <Tabs defaultValue='account' className='w-full '>
        <TabsList className='w-full flex justify-between bg-[#017c6e] h-[62px] rounded-none p-0'>
          <div>
            <TabsTrigger
              value='account'
              className=' text-white h-[61px] text-base  data-[state=active]:bg-[#017c6e] data-[state=active]:border-b-4 rounded-none data-[state=active]:border-secondary data-[state=active]:text-White'
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value='plans'
              className=' text-white h-[61px] text-base data-[state=active]:bg-[#017c6e] data-[state=active]:border-b-4 rounded-none data-[state=active]:border-secondary data-[state=active]:text-White'
            >
              Plans
            </TabsTrigger>
            <TabsTrigger
              value='documentation'
              className=' text-white h-[61px] text-base data-[state=active]:bg-[#017c6e] data-[state=active]:border-b-4 rounded-none data-[state=active]:border-secondary data-[state=active]:text-White'
            >
              Documentation
            </TabsTrigger>
            <TabsTrigger
              value='testAPI'
              className=' text-white h-[61px] text-base data-[state=active]:bg-[#017c6e] data-[state=active]:border-b-4 rounded-none data-[state=active]:border-secondary data-[state=active]:text-White'
            >
              Test
            </TabsTrigger>
          </div>
          <div className='flex gap-4'>
            <div className='border-r border-white text-white flex flex-col items-center pe-4'>
              <div className='flex gap-1'>
                <Image src={'/icons/services/latency.svg'} alt='' width={16} height={16} />
                <p className='text-sm'>Latency</p>
              </div>

              <p className='font-medium text-lg'>90 MS</p>
            </div>
            <div className='border-r border-white text-white  flex flex-col items-center pe-4'>
              <div className='flex gap-1'>
                <Image src={'/icons/services/level.svg'} alt='' width={16} height={16} />
                <p className='text-sm'>Service Level</p>
              </div>
              <p className='font-medium text-lg'>100%</p>
            </div>
            <div className=' text-white flex-col flex items-center pe-4'>
              <div className='flex gap-1'>
                <Image src={'/icons/services/health.svg'} alt='' width={16} height={16} />
                <p className='text-sm'>Health Check</p>
              </div>
              <p className='font-medium text-lg'>100%</p>
            </div>
          </div>
        </TabsList>
        <TabsContent value='account'>
          <AboutSection />
        </TabsContent>
        <TabsContent value='plans'>
          <PlansTab />
        </TabsContent>
        <TabsContent value='documentation'>
          <DocumentationTab />
        </TabsContent>
        <TabsContent value='testAPI'>
          <TestAPI />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  )
}
