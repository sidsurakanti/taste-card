import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import type { LastFmResultsCardProps } from "@components/LastFmResultsCard";

interface SelectionsProp {
  currentPeriod: LastFmResultsCardProps["period"];
  onPeriodChange: (value: LastFmResultsCardProps["period"]) => void;
}

export const displayPeriod: {
  [key in LastFmResultsCardProps["period"]]: string;
} = {
  "7day": "1 week",
  "1month": "1 month",
  "3month": "3 months",
  "6month": "6 months",
  "12month": "1 year",
  overall: "Overall",
};

export function LastFmPeriodSelections({
  currentPeriod,
  onPeriodChange,
}: SelectionsProp) {
  const periods: LastFmResultsCardProps["period"][] = [
    "7day",
    "1month",
    "3month",
    "6month",
    "12month",
    "overall",
  ];

  return (
    <Select onValueChange={onPeriodChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={
            currentPeriod === "3month"
              ? "3 months"
              : displayPeriod[currentPeriod]
          }
        />
      </SelectTrigger>

      <SelectContent className="">
        {periods.map((period, index) => (
          <SelectItem key={index} value={period}>
            {displayPeriod[period]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
