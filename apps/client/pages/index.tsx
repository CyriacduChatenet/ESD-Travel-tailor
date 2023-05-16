import { Inter } from 'next/font/google'

import { Layout } from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Home page</h1>
      </main>
    </Layout>
  )
}
