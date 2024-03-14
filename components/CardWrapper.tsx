"use client";

import { useRef, RefObject } from "react";
import DomToImage from "dom-to-image";
import { saveAs } from "file-saver";
import { DownloadIcon } from "@components/ui/icons";

export function CardWrapper({ children }: { children: React.ReactNode }) {
  const downloadRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    const node: HTMLDivElement | null = downloadRef.current;
    if (node) {
      const blob = await DomToImage.toBlob(node);
      saveAs(blob, "lastfm-stats.png");
    }
  };

  return (
    <>
      <div ref={downloadRef} className="h-full w-full p-4 pt-0">
        {children}
      </div>
      {/* <button
				onClick={downloadImage}
				className="h-8 w-8 text-primary bg-secondary flex justify-center items-center rounded-[50%] shadow-md"
			>
				<DownloadIcon />
			</button> */}
    </>
  );
}
