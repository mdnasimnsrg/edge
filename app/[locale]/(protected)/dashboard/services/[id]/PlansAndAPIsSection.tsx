import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DocumentationTab } from './DocumentationTab'
import { PlansTab } from './PlansTab'

export function PlansAndAPIsSectionV2() {
  return (
    <Tabs defaultValue='plans'>
      <TabsList className='w-full flex justify-start p-5 bg-[#017c6e] h-[62px] rounded-md '>
        <TabsTrigger
          value='plans'
          className=' text-white h-[61px] text-base  data-[state=active]:bg-[#017c6e] data-[state=active]:border-b-4 rounded-none data-[state=active]:border-secondary data-[state=active]:text-White'
        >
          Plans
        </TabsTrigger>
        <TabsTrigger
          value='apis'
          className=' text-white h-[61px] text-base  data-[state=active]:bg-[#017c6e] data-[state=active]:border-b-4 rounded-none data-[state=active]:border-secondary data-[state=active]:text-White'
        >
          APIs
        </TabsTrigger>
        <TabsTrigger
          value='docs'
          className=' text-white h-[61px] text-base  data-[state=active]:bg-[#017c6e] data-[state=active]:border-b-4 rounded-none data-[state=active]:border-secondary data-[state=active]:text-White'
        >
          Documentation
        </TabsTrigger>
      </TabsList>
      <TabsContent value='plans'>
        <PlansTab />
      </TabsContent>
      <TabsContent value='apis'>apis</TabsContent>
      <TabsContent value='docs'>
        <DocumentationTab />
      </TabsContent>
    </Tabs>
  )
}
