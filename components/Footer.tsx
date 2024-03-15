"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
	const path = usePathname();

	return (
		<footer className="flex justify-center h-30 p-2">
			<ul className="w-full flex items-center justify-around md:justify-center md:gap-10 text-primary font-medium text-sm md:text-md flex-wrap p-2">
				<li className="hover:-translate-y-1 hover:underline hover:underline-offset-4 transition-transform">
					<Link href="https://discord.com/users/521872289231273994">
						reach out
					</Link>
				</li>

				<li className="hover:-translate-y-1 hover:underline hover:underline-offset-4 transition-transform">
					<Link href="https://github.com/sidsurakanti/taste-card/tree/remake">
						code
					</Link>
				</li>

				<li className="flex items-center">powered by spotify & last.fm</li>

				{path === "/spotify" && (
					<li className="hover:-translate-y-1 hover:underline hover:underline-offset-4 transition-transform">
						<Link href="https://spotify.com/logout">logout</Link>
					</li>
				)}
			</ul>
		</footer>
	);
}
