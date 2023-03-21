import { useUser } from '@travel-tailor/contexts'
import { WebNavbar } from '@travel-tailor/ui'
import { PropsWithChildren, useEffect } from 'react'

import styles from './layout.module.css'

export const Layout = ({ children }: PropsWithChildren) => {
  const { findUserInfo } = useUser();
  
  useEffect(() => {
    findUserInfo(`${process.env.NEXT_PUBLIC_API_URL}`);
  }, []);

  return (<>
    <WebNavbar/>
    <main className={styles.main}>{children}</main>
  </>);
}
