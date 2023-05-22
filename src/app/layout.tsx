import { Poppins } from 'next/font/google'

import Image from 'next/image'
import NavBar from '@/components/NavBar'

import gradient1 from '../../public/assets/gradients/Gradient1.png'
import gradient2 from '../../public/assets/gradients/Gradient2.png'
import gradient3 from '../../public/assets/gradients/Gradient3.png'
import gradient4 from '../../public/assets/gradients/Gradient4.png'
import gradient5 from '../../public/assets/gradients/Gradient5.png'
import gradient6 from '../../public/assets/gradients/Gradient6.png'

import 'public/globals.css'


const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['200', '300', '400', '500', '600', '700']
})

export const metadata = {
	title: 'Taste Card',
	description: 'Discover your latest trend in music.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const gradient = [gradient1, gradient2, gradient3, gradient4, gradient5, gradient6]
	const randomIndex = Math.floor(Math.random() * gradient.length);
	return (
		<html lang="en">
		  <body 
		  	className={
					`${poppins.className}
					bg-background 
					w-screen h-screen 
					overflow-x-hidden 
					relative 
					flex flex-col`}
			>
			<div 
				className="fixed
						   top-0 left-0 
						   w-full h-full 
						   z-0 
						   pointer-events-none"
			>
			  <Image
				src={gradient[randomIndex]}
				alt={""}
				priority={true}
			  />
			</div>
			<div className="relative z-10 flex-grow">
			  <header className="pt-8 pb-2 px-20">
				<NavBar/>
			  </header>
			  <div className="overflow-y-auto pb-8">
				{children}
			  </div>
			</div>
		  </body>
		</html>
	  );}
