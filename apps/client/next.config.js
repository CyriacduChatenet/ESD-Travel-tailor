/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
		transpilePackages: [
		'@travel-tailor/functions',
		'@travel-tailor/types',
		'@travel-tailor/hooks',
		'@travel-tailor/contexts',
		'@travel-tailor/services',
		'@travel-tailor/constants',
		'@travel-tailor/ui',
	],
	experimental: {
		externalDir: true,
	}
};

module.exports = nextConfig;
