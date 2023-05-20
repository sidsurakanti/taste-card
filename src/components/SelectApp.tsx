// import { Toggle } from "@/components/ui/toggle"
import Image from "next/image"
import { useState } from "react"
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export default function SelectApp () {
    const [selectedToggle, setSelectedToggle] = useState("lastfm")

    return (
        <span>
			<ToggleGroup.Root
				type="single"
				defaultValue="lastfm"
				aria-label="app"
				className="space-x-1"
			>
				<ToggleGroup.Item className="p-2 px-2.5 rounded-lg data-[state=on]:bg-[rgba(255,255,255,0.3)]" value="lastfm" aria-label="lastfm">
					<p className="flex flex-row gap-1.5 text-gray-100">
						<Image 
							src="/assets/lfm-logo.png"
							alt="Last.fm"
							width={24}
							height={24}
							className="rounded-full"
						/>
						last.fm
					</p>
				</ToggleGroup.Item>
				<ToggleGroup.Item className="p-2 px-2.5 rounded-lg data-[state=on]:bg-[rgba(255,255,255,0.3)]" value="spotify" aria-label="spotify">
					<p className="flex flex-row gap-1.5 text-gray-100">
						<Image 
							src="/assets/spotify-logo.svg"
							alt="Spotify"
							width={22}
							height={22}
						/>
						spotify
					</p>
				</ToggleGroup.Item>	
			</ToggleGroup.Root>
        </span>
      )
}