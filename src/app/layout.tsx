import 'public/globals.css'
import { Poppins } from 'next/font/google'
import NavBar from '@/components/NavBar'

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['200', '300', '400', '500', '600', '700']
})

export const metadata = {
	title: 'Last.fm Canvas',
	description: 'Share your tastes with the world.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className='w-full h-full'>
			<body className={`${poppins.className} bg-background`}>
				<header className="my-10 mx-20">
					<NavBar/>
				</header>
				{children}
			</body>
		</html>
	)
}

