import {
  LastFmResultsCard,
  LastFmResultsCardProps,
} from "@components/LastFmResultsCard";
import { CardWrapper } from "@/components/CardWrapper";

export default function Overview({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const username = searchParams.username as LastFmResultsCardProps["username"];
  // TODO: remove this by adding default value when actually redirecting user to this page
  const period: LastFmResultsCardProps["period"] = searchParams?.period
    ? (searchParams.period as LastFmResultsCardProps["period"])
    : "12month";

  return (
    <main className="flex-1 flex">
      <CardWrapper>
        <LastFmResultsCard username={username} period={period} />
      </CardWrapper>
    </main>
  );
}
