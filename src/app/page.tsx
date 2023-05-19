'use client'

import Link from "next/link";
import Selections from "@/components/Selections";
import SearchBar from "@/components/SearchBar";
import { useState } from 'react'
import React from "react";


export default function Main() {
	const [username, setUsername] = useState('');
	const [period, setPeriod] = useState("3month");

	const handleUsernameChange = (e: any) => {
		setUsername(e.target.value);
	};
  
	const handlePeriodChange = (newPeriod: string) => {
		setPeriod(newPeriod);
	}

	return (
		<>
			<section className="w-full h-96 flex flex-row justify-center items-center">
				<div className="">
					<>
						<SearchBar username={username} handleChange={handleUsernameChange} />
						<Selections currentPeriod={period} onPeriodChange={handlePeriodChange} />
						<div className="flex flex-row justify-center my-5">
							<Link href={`/results?username=${username}&period=${period}`}>
								<button className="w-28 bg-pink-500 rounded-xl p-3 text-white" type="submit">
									Go
								</button>
							</Link>
						</div>
					</>
				</div>
			</section>
		</>
	)
}
