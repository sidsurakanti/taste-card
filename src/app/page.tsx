'use client'

import Selections from "@/components/Selections";
import SearchBar from "@/components/SearchBar";
import { buttonVariants } from "@/components/ui/button"
import { useState } from 'react'

import Link from "next/link";
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
		<section className="w-screen h-4/6 flex flex-col justify-center gap-5 items-center">
			<p className="text-white text-3xl font-semibold">
				Get your latest trends
			</p>
			<div className="bg-[rgba(215,215,215,.1)] flex flex-col gap-6 h-50 w-96 p-6 justify-center rounded-xl">
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
			</div>
		</section>
	)
}
