import { WebBanner, WebCreateTravelForm } from '@travel-tailor/ui'
import { NextPage } from 'next'

import { Layout } from '@/layout'
import { useUser } from '@travel-tailor/contexts'
import { ROLES } from '@travel-tailor/constants'

import styles from '../styles/home.module.scss'
import { NextImage } from '@travel-tailor/functions'

const Home: NextPage = () => {
  const { user } = useUser()
  return (
    <Layout>
      <>
        <h1 className={styles.title}>Travel tailor app</h1>
        <br />
          <div className={styles.content}>
          <WebBanner />
          <br />
          {user.roles.includes(ROLES.TRAVELER) ? (
            <WebCreateTravelForm
              api_url={`${process.env.NEXT_PUBLIC_API_URL}`}
              mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
            />
          ) : null}
          <section className={styles.sectionText}>
            <div>
              <h2>a</h2>
              <p></p>
            </div>
            <NextImage src={''} alt={''}/>
          </section>
          <section className={styles.sectionText}>
            <div>
              <h2>a</h2>
              <p></p>
            </div>
            <NextImage src={''} alt={''}/>
          </section>
          <section className={styles.sectionText}>
            <div>
              <h2>a</h2>
              <p></p>
            </div>
            <NextImage src={''} alt={''}/>
          </section>
          </div>
      </>
    </Layout>
  )
}

export default Home
