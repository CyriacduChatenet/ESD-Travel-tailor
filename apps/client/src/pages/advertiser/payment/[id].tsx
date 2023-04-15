import { Layout } from '@/layout'
import { AdvertiserService } from '@travel-tailor/services'
import { Advertiser } from '@travel-tailor/types'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { usePayment } from '@travel-tailor/hooks'

interface IProps {
  advertiser: Advertiser
}

const AdvertiserPaymentPage: NextPage<IProps> = ({ advertiser }) => {
  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`)

  const [amount, setAmount] = useState(1000)

  const [submitError, setSubmitError] = useState({});

  const router = useRouter()

  const { id } = router.query


  const handlePayed = async () => {
     usePayment(`${process.env.NEXT_PUBLIC_API_URL}`,stripePromise, { amount, location: `${advertiser.location}`}, setSubmitError)
  };

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

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

  const [submitError, setSubmitError] = useState({});

  const handleFetch = async () => {
    const ad = await AdvertiserService.findAdvertiserById(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      `${id}`,
      setSubmitError
    )
    setAdvertiser(ad)
  }

  return {
    props: {
      advertiser,
    },
  }
}