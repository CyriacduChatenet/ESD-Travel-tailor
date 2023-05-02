import { Context } from '@travel-tailor/contexts'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'

import '../styles/reset.scss'

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Context>
  )
}
