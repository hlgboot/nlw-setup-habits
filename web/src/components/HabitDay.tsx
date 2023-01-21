import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from "clsx";
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';

interface HabitDayProps {
    date: Date,
    defaultCompleted?: number ,
    amount?: number
}

export function HabitDay({amount = 0, defaultCompleted = 0, date}: HabitDayProps) {
    const [progress, setProgress] = useState(generateProgressPercentage({amount, completed: defaultCompleted}))

    const dayAndMonth = dayjs(date).format("DD/MM")
    const weekDay = dayjs(date).format("dddd")

    const isToday = dayjs().startOf('day').isSame(date)

    function handleProgressChanged(progress: number) {
        setProgress(progress)
    }

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx("w-10 h-10  border-2  rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background", {
                "bg-violet-500 border-violet-400": progress === 100,
                "bg-violet-600 border-violet-500": progress >= 75 && progress < 99,
                "bg-violet-700 border-violet-500": progress >= 50 && progress < 75,
                "bg-violet-800 border-violet-600": progress >= 25 && progress < 50,
                "bg-violet-900 border-violet-700": progress > 0 && progress < 25,
                "bg-zinc-900 border-zinc-800": progress === 0,
                "border-white border-4 ": isToday
            })} />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col shadow-lg PopoverContent focus:outline-none" >
                    
                    <span className="font-semibold text-zinc-400">{weekDay}</span>
                    <span className="mt-1 font-bold leading-tight text-3xl">{dayAndMonth}</span>

                    <ProgressBar progress={progress}/>

                    <HabitsList date={date} onProgressChanged={handleProgressChanged}/>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>
                </Popover.Content >
            </Popover.Portal>
        </Popover.Root>
    )
}