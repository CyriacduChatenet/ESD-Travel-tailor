import { Layout } from '@/layout'
import { AdvertiserService } from '@travel-tailor/services'
import { Advertiser } from '@travel-tailor/types'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { usePayment } from '@travel-tailor/hooks'

const AdvertiserPaymentPage: NextPage = () => {
  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`)

  const [amount, setAmount] = useState(1000)
  const [advertiser, setAdvertiser] = useState<Advertiser>({
    id: '',
    name: '',
    location: '',
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

  const handlePayed = async () => {
     usePayment(`${process.env.NEXT_PUBLIC_API_URL}`,stripePromise, { amount, location: `${advertiser.location}`})
  };

  useEffect(() => {
    handleFetch()
  }, [id])
  return (
    <Layout>
      <h1>Payment</h1>
      <p>{amount} €</p>
      <button onClick={handlePayed}>Payer</button>
      <br />
    </Layout>
  )
}

export default AdvertiserPaymentPage