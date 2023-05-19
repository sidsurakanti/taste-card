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
                    className={`bg-white rounded-full p-1 px-2 text-sm ${currentPeriod === period ? 'bg-pink-600 text-white' : ''}`}
                >
                    {period}
                </button>
            ))}
        </div>
    );
};