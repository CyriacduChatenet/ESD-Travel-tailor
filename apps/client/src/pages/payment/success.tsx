import { NextPage } from 'next'
import Link from 'next/link'

import { Layout } from '@/layout'

const PaymentSuccessPage: NextPage = () => {
  return (
    <Layout>
      <div>
        <h1>Payment Success Page</h1>
        <Link href={'/'}>Home</Link>
      </div>
    </Layout>
  )
}

export default PaymentSuccessPage
