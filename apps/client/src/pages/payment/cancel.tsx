import { NextPage } from 'next'
import Link from 'next/link'

import { Layout } from '@/layout'

const PaymentCancelPage: NextPage = () => {
  return (
    <Layout>
      <div>
        <h1>402 - Payment isn't accepted</h1>
        <Link href={'/'}>Home</Link>
      </div>
    </Layout>
  )
}

export default PaymentCancelPage
