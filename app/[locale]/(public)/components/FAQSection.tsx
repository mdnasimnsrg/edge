import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionTitle } from './SectionTitle'

export function FAQSection() {
  return (
    <section className='h-[auto] bg-primary py-[100px] relative' id="faqs">
      <div className='container flex flex-col items-center'>
        <SectionTitle title='FAQ' variant={'white'} />
        <p className='text-white text-[54px] font-medium pb-12'>Our FAQ has got you covered!</p>
        <div className='h-[auto] w-full bg-white rounded-md p-8'>
          <Accordion type='single' collapsible className='flex flex-col gap-5'>
            <AccordionItem value='item-1' className='rounded-lg' style={{ boxShadow: '0px 5px 16px 0px #080F340F' }}>
              <AccordionTrigger className='text-xl font-medium py-4 px-6 h-[76px]'>
                What is an API and how does it work?
              </AccordionTrigger>
              <AccordionContent className='pb-4 px-6 text-[#696969]'>
                An API, or Application Programming Interface, 
                is a set of rules and protocols that allows different 
                software applications to communicate and exchange information. 
                It works by having a client send a request to a server, which then 
                processes the request and returns a response. APIs consist of endpoints 
                representing specific functions, use HTTP methods (GET, POST, PUT, DELETE) 
                to define actions, and often require authentication and authorization to ensure 
                secure access. They enable seamless integration and interoperability between diverse 
                systems, promoting efficient development and innovation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2' className='rounded-lg' style={{ boxShadow: '0px 5px 16px 0px #080F340F' }}>
              <AccordionTrigger className='text-xl font-medium py-4 px-6 h-[76px]'>
                What kind of data can I access through your API?
              </AccordionTrigger>
              <AccordionContent className='pb-4 px-6 text-[#696969]'>
                our API, you can access a wide variety of data, including user information, 
                transaction records, product details, service statuses, and analytics metrics. 
                The API provides endpoints to retrieve, create, update, and delete data, ensuring 
                comprehensive access to essential information required for integration and development 
                purposes. The data is typically available in structured formats like JSON or XML, 
                facilitating easy processing and utilization in your applications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3' className='rounded-lg' style={{ boxShadow: '0px 5px 16px 0px #080F340F' }}>
              <AccordionTrigger className='text-xl font-medium py-4 px-6 h-[76px]'>
                Is there a limit on API usage?
              </AccordionTrigger>
              <AccordionContent className='pb-4 px-6 text-[#696969]'>
                there is a limit on API usage to ensure fair access and optimal performance
                for all users. The limits are defined by the number of requests you can make 
                within a specific time frame, such as per minute, hour, or day. These limits 
                vary depending on your subscription plan or usage agreement. If you exceed the 
                allowed number of requests, you may experience throttling or temporary access 
                restrictions. To accommodate higher usage needs, you can upgrade your plan or 
                contact us for custom solutions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
