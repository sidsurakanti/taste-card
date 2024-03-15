"use client";

import { authorizeSpotify } from "@lib/actions";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@components/ui/dialog";
import { LastFmPeriodSelections } from "@components/LastFmPeriodSelect";
import type { LastFmResultsCardProps } from "@components/LastFmResultsCard";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { WarningIcon } from "@components/ui/icons";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
	const router = useRouter();
	const [lastFmUsername, setLastFmUsername] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [period, setPeriod] =
		useState<LastFmResultsCardProps["period"]>("3month");
	const usernameSchema = z.string().min(1);

	const handleLastFmUsernameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setLastFmUsername(e.target.value);

		// clear error message if input is dirty
		if (errorMessage) {
			setErrorMessage("");
		}
	};

	const handleLastFmSubmit = (): void => {
		const result = usernameSchema.safeParse(lastFmUsername);
		if (!result.success) {
			setErrorMessage("Please enter a valid username");
			return;
		}
		// redirect to last.fm page
		router.push(`/lastfm?username=${lastFmUsername}&period=${period}`);
	};

	// redirect user to spotify authorization page
	// the page then redirects back to the callback api route
	// the api route processes the authorization code to get access and refresh tokens
	// which then redirects to the overview page
	const handleClick = (): Promise<void> => authorizeSpotify();

	return (
		<main className="flex-1 w-full md:w-4/5 lg:w-3/5 mx-auto overflow-hidden md:overflow-visible">
			<section className="relative h-full w-full flex flex-col justify-center items-center gap-12 text-center">
				<motion.div
					animate={{
						scale: [1, 1.1, 1.1, 1, 1],
						// rotate: [0, 0, 180, 180, 0],
						backgroundColor: [
							"#f4f4f430",
							"#4E896C",
							"#488A85",
							"#488A85",
							"#f4f4f460",
						],
						borderRadius: ["20%", "20%", "30%", "30%", "40%"],
					}}
					transition={{
						duration: 12,
						ease: "easeInOut",
						times: [0, 0.2, 0.5, 0.8, 1],
						repeat: Infinity,
						repeatDelay: 1,
					}}
					className="w-full 2xl:w-2/3 h-[260px] absolute z-10 blur-[80px]"
				/>
				<h1 className="max-w-5xl text-primary font-bold text-[62px] mx-2 leading-none md:text-8xl z-20">
					Rediscover your {""}
					<motion.mark
						animate={{
							color: ["#111F36", "#57495C", "#7A0C38"],
						}}
						style={{
							background:
								"url('https://s2.svgbox.net/pen-brushes.svg?ic=brush-9&color=D0E8E0')",
						}}
						className="px-4 py-1"
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: "reverse",
						}}
					>
						taste.
					</motion.mark>
				</h1>
				<div className="flex gap-3 justify-start z-20">
					<button
						onClick={handleClick}
						className="group relative inline-block h-[45px] w-[140px] md:h-[60px] md:w-[250px] overflow-hidden rounded-full text-lg text-black"
					>
						<div className="h-[inherit] w-[inherit] overflow-hidden rounded-full bg-primary [transition:_transform_1.5s_cubic-bezier(.19,1,.22,1)] group-hover:scale-[.94]">
							<span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#cbf55d] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_200ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_270ms]" />
							<span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#7db486] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_300ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_470ms]" />
							<span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#1DB954] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_380ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_670ms]" />
						</div>

						<span className="absolute inset-0 z-10 m-auto flex w-4/5 items-center justify-center font-semibold group-hover:-translate-y-1/3 group-hover:opacity-0 group-hover:[transition:_transform_1s_cubic-bezier(.32,.99,.49,.99),_opacity_.4s]">
							<Image
								src="/spotify-logo-black.png"
								alt="spotify logo"
								width={24}
								height={24}
								className="inline mx-2"
							/>{" "}
							Spotify
						</span>
						<span className="absolute inset-0 z-10 m-auto flex w-4/5 translate-y-1/3 items-center justify-center font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:[transition:_1s_all_cubic-bezier(.32,.99,.49,.99)]">
							Continue
						</span>
					</button>

					<Dialog>
						<DialogTrigger asChild>
							<button className="group relative inline-block h-[45px] w-[140px] md:h-[60px] md:w-[250px] overflow-hidden rounded-full text-lg text-black">
								<div className="h-[inherit] w-[inherit] overflow-hidden rounded-full bg-primary [transition:_transform_1.5s_cubic-bezier(.19,1,.22,1)] group-hover:scale-[.94]">
									<span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#f5b0ab] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_200ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_270ms]" />
									<span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#f3adca] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_300ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_470ms]" />
									<span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#ff9797] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_380ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_670ms]" />
								</div>

								<span className="absolute inset-0 z-10 m-auto flex w-4/5 items-center justify-center font-semibold group-hover:-translate-y-1/3 group-hover:opacity-0 group-hover:[transition:_transform_1s_cubic-bezier(.32,.99,.49,.99),_opacity_.4s]">
									<Image
										src="/lfm-logo.png"
										alt="last.fm logo"
										width={24}
										height={24}
										className="inline mx-2"
									/>{" "}
									Last.fm
								</span>
								<span className="absolute inset-0 z-10 m-auto flex w-4/5 translate-y-1/3 items-center justify-center font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:[transition:_1s_all_cubic-bezier(.32,.99,.49,.99)]">
									Continue
								</span>
							</button>
						</DialogTrigger>

						<DialogContent className="flex flex-col gap-3 text-primary">
							<DialogHeader>
								<DialogTitle>Last.fm</DialogTitle>
								<DialogDescription>
									Let&apos;s see what you&apos;re into!
								</DialogDescription>
							</DialogHeader>

							<span className="flex flex-col gap-1.5">
								<Label htmlFor="username"> Username </Label>
								<Input
									id="username"
									placeholder="shakesphere"
									onChange={handleLastFmUsernameChange}
								/>
							</span>

							<LastFmPeriodSelections
								onPeriodChange={(newPeriod: LastFmResultsCardProps["period"]) =>
									setPeriod(newPeriod)
								}
								currentPeriod={period}
							/>

							<span
								onClick={() => handleLastFmSubmit()}
								className={cn(
									buttonVariants({ variant: "secondary", size: "lg" }),
									"text-primary hover:-translate-y-0.5 transition-all duration-300 hover:rounded-xl hover:bg-[#9cc2c5] hover:text-secondary cursor-pointer"
								)}
							>
								Go
							</span>

							{errorMessage && (
								<span className="flex items-center justify-center gap-2 bg-[#dfb0aa] text-sm text-secondary p-2 rounded-lg">
									<WarningIcon />
									{errorMessage}
								</span>
							)}
						</DialogContent>
					</Dialog>
				</div>
			</section>
		</main>
	);
}
