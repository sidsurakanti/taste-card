'use client'

import Link from "next/link";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { useState } from 'react'
import React from "react";

export default function Main() {
	const [username, setUsername] = useState('');

	const handleChange = (e) => {
	  setUsername(e.target.value);
	};

	return (
		<>
			<header className="my-10 mx-20">
				<NavBar/>
			</header>
			<section className="w-full h-96 flex flex-row justify-center items-center">
				<SearchBar
					username={username}
					handleChange={handleChange}
				/>
			</section>
		</>
	)
}
