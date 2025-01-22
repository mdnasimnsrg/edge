const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })
import { SectionTitle } from '@/app/[locale]/(public)/components/SectionTitle'
import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'

export const markDown = `
## Overview

Welcome to our API service. It offers a range of features designed to facilitate
seamless integration and efficient data exchange between software applications. 
Common features include secure authentication and authorization mechanisms, 
such as API keys and OAuth tokens, to ensure that only authorized users can access 
the service. Error handling and status codes are also integral, offering clear guidance 
on request outcomes and troubleshooting. Additionally, Our API services frequently include 
rate limiting to manage the volume of requests and ensure fair usage, as well as support 
for structured data formats like JSON and XML for easy data processing and integration

## Full Documentation

Consult our documentation to get the best out of the API : https://gitlab.com/

## ChangeLog

To find out about the latest updates, new competitions etc…  https://gitlab.com/

## Servers availability

As the availability of our APIs is essential for us and our users, we make every effort to ensure that the service is available to the maximum and with a low latency.
You can check the availability of our APIs on this link: https://Rabet.checklyhq.com

## Authentication

We uses API keys to allow access to the API. You can register a new API key in Rabet.
Our API expects for the API key to be included in all API requests to the server in a header that looks like the following:

\`\`\`js
{
"status": "OK",
"request_id": "53345b8a-de21-40c7-9ec7-b5842796c526",
"data": {..} or [..]
}
\`\`\`

## Requests Headers & CORS
The API is configured to work only with GET requests and allows only the headers listed below:

* x-rabetapi-host
* x-rabetapi-key
If you make non-GET requests or add headers that are not in the list, you will receive an error from the API.
Some frameworks (especially in JS, nodeJS…) automatically add extra headers, you have to make sure to remove them in order to get a response from the API.

## ARCHITECTURE

![Alt text](http://169.63.176.109/markdown.png "a title")

`
export function DocumentationTab() {
  return (
    <section className='bg-white px-10 py-[64px] flex w-full flex-col items-center'>
      <SectionTitle title='Documentation' />
      <p className='text-[32px] font-medium pt-4'>
        <span className='text-secondary'>Rabet’s API</span> Documentation You Can Depend On
      </p>
      <div className='py-12 w-full '>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className='py-12 prose'>
          {markDown}
        </ReactMarkdown>
      </div>
    </section>
  )
}
