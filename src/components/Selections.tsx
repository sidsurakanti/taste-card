import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface SelectionsProp {
    currentPeriod: string
    onPeriodChange: any
}

export default function Selections({ currentPeriod, onPeriodChange}: SelectionsProp) {
    const displayPeriod = ['1 week', '1 month', '3 months', '6 months', '1 year']
    const periods = ['7day', '1month', '3month', '6month', '12month']

    return (
        <Select onValueChange={onPeriodChange}>
            <SelectTrigger 
                className="w-[160px]
                           bg-[rgba(217,217,217,0.1)] 
                           focus:outline-none 
                           text-[rgba(255,255,255,0.7)] 
                           border-[rgba(255,255,255,0.3)]"
            >
                <SelectValue placeholder={currentPeriod === "3month" ? "3 months" : currentPeriod} />
            </SelectTrigger>

            <SelectContent 
                className="bg-[rgba(255,255,255,0.1)] 
                           border-[rgba(255,255,255,0.3)]
                           outline-none"
            >
                {periods.map((period, index) => (
                    <SelectItem 
                        className="text-gray-200 bg-[rgba(217,217,217,0.1)]"
                        key={index} 
                        value={period}
                    >
                        {displayPeriod[index]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
