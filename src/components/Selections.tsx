import * as Select from '@radix-ui/react-select';

interface SelectionsProp {
  currentPeriod: string
  onPeriodChange: any
}

export default function Selections({
  currentPeriod,
  onPeriodChange,
}: SelectionsProp) {
  const periods = ['7day', '1month', '3month', '6month', '12month']
  const displayPeriod = ['a Week', 'a Month', '3 Months', '6 Months', 'a Year']

  return (
    <Select.Root>
    <Select.Trigger>
      <Select.Value  />
      <Select.Icon />
    </Select.Trigger>

    <Select.Portal>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Item value={'a'}>
            <Select.ItemText placeholder='a' />
            <Select.ItemIndicator />
          </Select.Item>

          <Select.Group>
            <Select.Label  />
            <Select.Item value={'a'}>
              <Select.ItemText />
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Group>

          <Select.Separator />
        </Select.Viewport>
        <Select.ScrollDownButton />
        <Select.Arrow />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
    // <select value={currentPeriod} onChange={onPeriodChange} className='p-3  border-[rgba(255,255,255,0.2)] bg-[rgba(217,217,217,0.1)]  rounded-xl outline-none '>
    //   {displayPeriod.map((v, i) => (
    //     <option key={i} value={periods[i]}>
    //       {v}
    //     </option>
    //   ))}
    // </select>
  )
}
