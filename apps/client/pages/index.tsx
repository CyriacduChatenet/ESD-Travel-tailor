import { Inter } from 'next/font/google'

import { Layout } from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout title={'Personalized Travel Management: Create Your Perfect Journey | Travel Tailor'} description={'Discover an innovative travel management platform that empowers you to curate your ideal journey based on your unique preferences. Create customized itineraries and explore a wide range of activities tailored to your tastes. Start planning your dream vacation today with our intuitive travel planner.'}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-20">
        <h1>Home page</h1>
      </main>
    </Layout>
  )
}
