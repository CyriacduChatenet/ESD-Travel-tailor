import { Layout } from '@/layout'
import { AdvertiserService } from '@travel-tailor/services'
import { Advertiser } from '@travel-tailor/types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { usePayment } from '@travel-tailor/hooks'

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`)

const AdvertiserPaymentPage: NextPage = () => {
  const [amount, setAmount] = useState(1000)
  const [advertiser, setAdvertiser] = useState<Advertiser>({
    id: '',
    name: '',
    customer: {
      id: '',
      email: '',
      name: '',
      stripeId: '',
    },
  })

  const router = useRouter()

  const { id } = router.query

  const handleFetch = async () => {
    const ad = await AdvertiserService.findAdvertiserById(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      `${id}`
    )
    setAdvertiser(ad)
  }

  useEffect(() => {
    handleFetch()
  }, [id])
  return (
    <Layout>
      <h1>Payment</h1>
      <p>{amount} €</p>
      <button onClick={() => usePayment(`${process.env.NEXT_PUBLIC_API_URL}`, stripePromise)}>Payer</button>
      <br />
    </Layout>
  )
}

export default AdvertiserPaymentPage
