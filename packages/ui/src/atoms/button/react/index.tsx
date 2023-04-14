import { FC } from '@travel-tailor/functions'

import styles from './style.module.scss'

interface IProps {
  label: string,
  onClick?: () => void
}

export const WebButton: FC<IProps> = ({ label, onClick }) => {
  return <button className={styles.button} onClick={onClick}>{label}</button>
}
