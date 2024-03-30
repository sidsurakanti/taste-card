import "@/styles/globals.css";
import type { Metadata } from "next";
import { poppins } from "@/styles/fonts";
import { cn } from "@lib/utils";
import { Nav } from "@components/Nav";
import { Footer } from "@components/Footer";
import { Cursor } from "@components/CustomCursorWrapper";

export const metadata: Metadata = {
	title: "Taste Card",
	description: "View a clean, aesthetic overview of your recent music trends.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					poppins.className,
					"flex flex-col h-screen w-full antialiased"
				)}
			>
				{/* <Cursor> */}
				<Nav />
				{children}
				<Footer />
				{/* </Cursor> */}
			</body>
		</html>
	);
}
