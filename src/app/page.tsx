'use client'

import Link from "next/link";
import NavBar from "@/components/NavBar";
import { useState } from 'react'
import React from "react";

export default function Main() {
	const [username, setUsername] = useState('');

	const handleChange = (e) => {
	  setUsername(e.target.value);
	};

	return (
		<>
			<NavBar/>
			<div className="search-bar">
				<input
				type="text"
				value={username}
				onChange={handleChange}
				placeholder="Enter username"
				/>
			</div>
			<Link 
				href={`/results?username=${username}`}
				className="text-white"
			>
				Send
			</Link>
		</>
	)
}
