import { Context } from '@travel-tailor/contexts';
import type { AppProps } from 'next/app';

import '../styles/reset.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Context>
			<Component {...pageProps} />
		</Context>
	);
}
