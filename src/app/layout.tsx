import './globals.css'
import { Montserrat } from 'next/font/google'

const sans = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['400', '500', '600', '700']
})

export const metadata = {
	title: 'Last.fm Canvas',
	description: 'Share your tastes with the world.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${sans.className} bg-background`}>
			{children}
			</body>
		</html>
	)
}

