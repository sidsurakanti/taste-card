interface SelectionsProp {
    currentPeriod: string,
    onPeriodChange: any,
}

export default function Selections({ currentPeriod, onPeriodChange }: SelectionsProp) {
    const periods = ["7day", "1month", "3month", "6month", "12month"];
    const displayPeriod = ["1 week", "1 month", "3 months", "6 months", "1 year"]
  
    return (
        <div className="flex flex-row gap-3 p-3">
            {periods.map((period, index) => (
                <button
                    key={period}
                    onClick={() => onPeriodChange(period)}
                    className={`rounded-full p-2 px-3 text-md ${currentPeriod === period ? 'text-white bg-pink-400' : 'bg-white text-black'}`}
                >
                    {displayPeriod[index]}
                </button>
            ))}
        </div>
    );
};