'use client'

import Selections from "@/components/Selections"
import SearchBar from "@/components/SearchBar"
import SelectApp from "@/components/SelectApp"
import { buttonVariants } from "@/components/ui/button"

import Link from "next/link";
import { useState } from "react"


export default function Main() {
	const [username, setUsername] = useState('')
	const [period, setPeriod] = useState("3month")
	const [currentApp, setCurrentApp] = useState("lastfm")

	const handleUsernameChange = (e: any) => {
		setUsername(e.target.value)
	}
  
	const handlePeriodChange = (newPeriod: string) => {
		setPeriod(newPeriod)
	}

	const handleAppChange = (newApp: string) => {
		setCurrentApp(newApp)
	}

	return (
		<section 
			className="w-screen h-4/6 flex flex-col justify-center gap-8 items-center"
		>
			<h1 className="text-white text-[26px] font-semibold">
				Uncover your listening habits
			</h1>
			<div 
				className="bg-[rgba(215,215,215,.1)]
						   flex flex-col justify-center
						   gap-6 
						   h-50 w-96 
						   p-6 
						   rounded-xl"
			>
				<SelectApp handleAppChange={handleAppChange}/>

				{currentApp == "lastfm" && (
					<>
						<SearchBar username={username} handleChange={handleUsernameChange} />

						<div className="flex flex-row justify-between">
							<Selections currentPeriod={period} onPeriodChange={handlePeriodChange} />
							<Link 
								href={`/results?username=${username}&period=${period}`}
								className={buttonVariants({ variant: "outline", size: "lg"})}
							>
								Go
							</Link>
						</div>
					</>
				)}
			</div>
		</section>
	)
}
