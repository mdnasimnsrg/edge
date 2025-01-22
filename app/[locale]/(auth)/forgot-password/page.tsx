import { Metadata } from 'next'
import { ForgetPasswordForm } from './ForgetPasswordForm'
import { ResetPasswordForm } from './ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Forgot Password'
}
export default function ForgetPassword({ searchParams }: { searchParams: any }) {
  const haveToken = searchParams.token

  return <>{haveToken ? <ResetPasswordForm /> : <ForgetPasswordForm />}</>
}
