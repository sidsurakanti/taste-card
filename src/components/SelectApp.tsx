import Image from "next/image"
import * as ToggleGroup from "@radix-ui/react-toggle-group";

// Create toggle group for last.fm and other apps
export default function SelectApp ( { handleAppChange } : any ) {
    return (
        <span>
			<ToggleGroup.Root
				type="single"
				defaultValue="lastfm"
				aria-label="app"
				className="space-x-1"
				onValueChange={handleAppChange}
			>
				<ToggleGroup.Item 
					className="p-2 px-2.5 
							   rounded-lg 
							   data-[state=on]:bg-[rgba(255,255,255,0.3)]" 
					value="lastfm" 
					aria-label="lastfm"
				>
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
			</ToggleGroup.Root>
        </span>
      )
}