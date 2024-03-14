import { SpotifyResultsCard } from "@components/SpotifyResultsCard";
import { CardWrapper } from "@/components/CardWrapper";

export default function SpotifyResults({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const period = searchParams.period
    ? (searchParams.period as "long_term" | "medium_term" | "short_term")
    : "long_term";
  return (
    <main className="flex-1">
      <CardWrapper>
        <SpotifyResultsCard period={period} />
      </CardWrapper>
    </main>
  );
}
