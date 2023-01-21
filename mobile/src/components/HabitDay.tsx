import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progres-percentage";

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface Props extends TouchableOpacityProps {
    amount?: number,
    completed?: number,
    date: Date
}

export function HabitDay({amount = 0, completed = 0, date, ...rest }: Props) {
    const progress = generateProgressPercentage({amount, completed})

    const today = dayjs().startOf('day').toDate()
    const isCurrentDay = dayjs(today).isSame(date)


    return (
        <TouchableOpacity activeOpacity={.7}
        className={clsx("m-1  border-2  rounded-lg", {
            "bg-violet-500 border-violet-400": progress === 100,
            "bg-violet-600 border-violet-500": progress >= 75 && progress < 99,
            "bg-violet-700 border-violet-500": progress >= 50 && progress < 75,
            "bg-violet-800 border-violet-600": progress >= 25 && progress < 50,
            "bg-violet-900 border-violet-700": progress > 0 && progress < 25,
            "bg-zinc-900 border-zinc-800": progress === 0,
            "border-white border-4": isCurrentDay
        })}
        style={{ width: DAY_SIZE, height: DAY_SIZE}}
        {...rest }
        />
    )
}