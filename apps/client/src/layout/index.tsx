import { WebButton, WebNavbar } from '@travel-tailor/ui';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import styles from './layout.module.css';

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<WebNavbar>
				<Link href={'/'}>
					<Image
						src={
							'https://images.unsplash.com/photo-1677612968800-4d9f1104d251?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
						}
						alt={'forest'}
						width={50}
						height={50}
					/>
				</Link>
				<Link href={'/signin'}>
					<WebButton label="Connexion" />
				</Link>
			</WebNavbar>
			<main className={styles.main}>{children}</main>
		</>
	);
};
