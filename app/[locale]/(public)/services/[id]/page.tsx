import { ProductAPIsPublic } from './components/ProductAPIsPublic'
import { ProductDocumentation } from './components/ProductDocumentation'
import { ProductHeroSection } from './components/ProductHeroSection'
import { ProductPricingPlans } from './components/ProductPricingPlans'

export default function Product() {
  return (
    <>
      <ProductHeroSection />
      <ProductPricingPlans />
      <ProductAPIsPublic />
      <ProductDocumentation />
    </>
  )
}
