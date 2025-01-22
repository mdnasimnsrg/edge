import { Metadata } from 'next'
import { Footer } from '../../(public)/components/Footer'
import { NavBar } from '../../(public)/components/NavBar'
import SignUpForm from './SignUpForm'

export const metadata: Metadata = {
  title: 'Registration'
}
export default function Component() {
  return (
    <div className='bg-[#f8f8f8]'>
      <div className='h-16'>
        <NavBar />
      </div>
      <SignUpForm />
      <Footer />
    </div>
  )
}
