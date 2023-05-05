import { FC, useEffect, useState } from "react";

import styles from "./style.module.scss";

export const WebFooter: FC = () => {
    const [date, setDate] = useState<number>(0);

    useEffect(() => {
        setDate(new Date().getFullYear());
    }, []);
    return (
        <footer className={styles.footer}>
            <ul className={styles.list}>
                <li><a href="">Travel tailor</a></li>
                <li><a href="">© {date} Travel manager, Inc </a></li>
            </ul>
            <ul className={styles.list}>
                <li><a href="">Plan du site</a></li>
                <li><a href="">Conditions générales</a></li>
                <li><a href="">Information sur le projet</a></li>
            </ul>
            <ul className={styles.list}>
                <li><a href="#navbar"><div className={styles.round}></div></a></li>
            </ul>
        </footer>
    );
};