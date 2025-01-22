import { markDown } from '@/app/[locale]/(protected)/dashboard/services/[id]/DocumentationTab'
import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'
import { SectionTitle } from '../../../components/SectionTitle'

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })

export function ProductDocumentation() {
  return (
    <section className='bg-[#f6f6f6] py-[100px]' id='documentation'>
      <div className='container flex flex-col items-center justify-center '>
        <SectionTitle title='Documentation ' />
        <div className='flex justify-start w-full pt-[60px]'>
          <ReactMarkdown remarkPlugins={[remarkGfm]} className='py-12 prose'>
            {markDown}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}
