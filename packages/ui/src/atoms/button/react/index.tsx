import { FC } from "react";

import styles from './style.module.scss';

export const WebButton: FC = () => {
    return (
        <button className={styles.button}>Web button</button>
    );
};