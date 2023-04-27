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
              <h2>Une solution innovante</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                non elit ut ante commodo semper non sit amet turpis. Nullam
                interdum imperdiet lorem, vel consectetur leo pellentesque ac.
                Pellentesque semper molestie nisl, at ultricies metus eleifend
                quis. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. In maximus mauris
                gravida tellus suscipit tempor. Curabitur nec libero quis turpis
                convallis tincidunt vitae a diam. Nulla sit amet maximus dui.
                Sed ut neque ex. Morbi quis enim volutpat, tempus urna sit amet,
                facilisis tellus. Sed sit amet felis in massa condimentum
                rutrum. Aenean finibus pulvinar dignissim. Donec sit amet lacus
                nulla. In sollicitudin dolor et diam gravida hendrerit. Interdum
                et malesuada fames ac ante ipsum primis in faucibus.
              </p>
            </div>
            <NextImage
              src={
                'https://images.unsplash.com/photo-1500043357865-c6b8827edf10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
              }
              alt={''}
              width={200}
              height={200}
            />
          </section>
          <section className={styles.sectionTextRight}>
            <div>
              <h2>Des activités adaptés aux goûts de l’utilisateur</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                non elit ut ante commodo semper non sit amet turpis. Nullam
                interdum imperdiet lorem, vel consectetur leo pellentesque ac.
                Pellentesque semper molestie nisl, at ultricies metus eleifend
                quis. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. In maximus mauris
                gravida tellus suscipit tempor. Curabitur nec libero quis turpis
                convallis tincidunt vitae a diam. Nulla sit amet maximus dui.
                Sed ut neque ex. Morbi quis enim volutpat, tempus urna sit amet,
                facilisis tellus. Sed sit amet felis in massa condimentum
                rutrum. Aenean finibus pulvinar dignissim. Donec sit amet lacus
                nulla. In sollicitudin dolor et diam gravida hendrerit. Interdum
                et malesuada fames ac ante ipsum primis in faucibus.</p>
            </div>
            <NextImage
              src={
                'https://images.unsplash.com/photo-1500043357865-c6b8827edf10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
              }
              alt={''}
              width={200}
              height={200}
            />
          </section>
          <section className={styles.sectionText}>
            <div>
              <h2>Les activités des annonceurs mise en avant  </h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                non elit ut ante commodo semper non sit amet turpis. Nullam
                interdum imperdiet lorem, vel consectetur leo pellentesque ac.
                Pellentesque semper molestie nisl, at ultricies metus eleifend
                quis. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. In maximus mauris
                gravida tellus suscipit tempor. Curabitur nec libero quis turpis
                convallis tincidunt vitae a diam. Nulla sit amet maximus dui.
                Sed ut neque ex. Morbi quis enim volutpat, tempus urna sit amet,
                facilisis tellus. Sed sit amet felis in massa condimentum
                rutrum. Aenean finibus pulvinar dignissim. Donec sit amet lacus
                nulla. In sollicitudin dolor et diam gravida hendrerit. Interdum
                et malesuada fames ac ante ipsum primis in faucibus.</p>
            </div>
            <NextImage
              src={
                'https://images.unsplash.com/photo-1500043357865-c6b8827edf10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
              }
              alt={''}
              width={200}
              height={200}
            />
          </section>
        </div>
      </>
    </Layout>
  )
}

export default Home
