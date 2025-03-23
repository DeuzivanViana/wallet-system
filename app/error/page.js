'use client'
import { useSearchParams } from 'next/navigation'
import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Page() {
  const [errorMessage, setErrorMessage] = useState()
  const params = useSearchParams()

  useEffect(() => {
    setErrorMessage(params.get('message'))
  }, [params])

  return <Layout>
    <p className='text-red-500 font-bold p-4 text-center mt-[40vh]'>{ errorMessage || 'Nothing to show here...' }</p>
    <Link className='text-center text-blue-500 underline block' href={'/payment'}>Back to Payment Page</Link>
  </Layout>
}