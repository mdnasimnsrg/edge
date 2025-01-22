import { Metadata } from 'next'
import { FAQSection } from './components/FAQSection'
import { GetStartedSection } from './components/GetStartedSection'
import { HeroSection } from './components/HeroSection'
import { SeeMoreSection } from './components/SeeMoreSection'
import { ServicesSection } from './components/ServicesSection'

export const metadata: Metadata = { title: 'Rabet' }
export default function Index() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <GetStartedSection />
      <SeeMoreSection />
      <FAQSection />
      {/* <ContactUsSection /> */}
    </>
  )
}
