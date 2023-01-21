
interface Props {
    amount: number,
    completed: number
}

export function generateProgressPercentage({ amount, completed }: Props) {
    const progress = amount > 0 ? Math.round(completed / amount * 100) : 0
    return progress
}