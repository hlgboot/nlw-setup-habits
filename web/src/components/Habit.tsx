interface HabitProps {
    completed: number
}

export default function Habit({completed}: HabitProps) {
    return (
        <div className="bg-zinc-900 w-10 h-10 text-white rounded m-2 flex items-center justify-center">{completed}</div>
    )
}

// Componente = Reaproveitar / isolar
// Propriedade = Uma informação enviada para modificar um componente visual ou de forma comportamental