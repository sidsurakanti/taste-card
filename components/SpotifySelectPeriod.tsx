"use client";
import type { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";

export function SpotifySelectPeriod() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const period = searchParams.get("period") || "medium_term";

  const changePeriod = (e: string) => {
    const newPeriod = e;
    router.push(`${pathname}?period=${newPeriod}`);
  };

  return (
    <div className="flex justify-center mb-4">
      <ToggleGroup type="single" value={period} onValueChange={changePeriod}>
        <ToggleGroupItem value="short_term">short term</ToggleGroupItem>
        <ToggleGroupItem value="medium_term">medium term</ToggleGroupItem>
        <ToggleGroupItem value="long_term">long term</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
