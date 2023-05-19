interface SelectionsProp {
    currentPeriod: string,
    onPeriodChange: any,
}

export default function Selections({ currentPeriod, onPeriodChange }: SelectionsProp) {
    const periods = ["7day", "1month", "3month", "6month", "12month"];
  
    return (
        <div className="flex flex-row gap-3 p-3">
            {periods.map(period => (
                <button
                    key={period}
                    onClick={() => onPeriodChange(period)}
                    className={`rounded-full p-1 px-2 text-sm ${currentPeriod === period ? 'text-white bg-pink-400' : 'bg-white text-black'}`}
                >
                    {period}
                </button>
            ))}
        </div>
    );
};