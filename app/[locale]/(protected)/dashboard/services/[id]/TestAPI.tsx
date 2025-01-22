'use client'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export function TestAPI() {
  return (
    <div className='p-10'>
      <SwaggerUI url={`${process.env.NEXT_PUBLIC_BASE_URL}/api/json`} />
    </div>
  )
}
