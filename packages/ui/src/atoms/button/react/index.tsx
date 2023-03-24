import { FC } from '@travel-tailor/functions'

import styles from './style.module.scss'

interface IProps {
  label: string
}

export const WebButton: FC<IProps> = ({ label }) => {
  return <button className={styles.button}>{label}</button>
}
