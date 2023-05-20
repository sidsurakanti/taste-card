import { Poppins } from 'next/font/google'

import Image from 'next/image'
import NavBar from '@/components/NavBar'
import gradient from '../../public/assets/gradient.png'
import 'public/globals.css'

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['200', '300', '400', '500', '600', '700']
})

export const metadata = {
	title: 'Musical Snapshot',
	description: 'Discover your latest trend in music.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${poppins.className} bg-background w-screen h-screen overflow-hidden`}>
				<Image src={gradient} alt={""} className='absolute w-full h-full -z-10 opacity-70 saturate-150'></Image>
				<header className="py-8 px-20">
					<NavBar/>
				</header>
				{children}
			</body>
		</html>
	)
}

