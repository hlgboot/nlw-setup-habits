import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import {FormEvent, useState} from "react";
import { toast } from "react-hot-toast";
import { api } from "../lib/axios";

const availableWeekDays = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]

interface NewHabitFormProps {
    close: () => void,
}

export function NewHabitForm({close}: NewHabitFormProps) {

    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState('')

    async function createNewHabit(e: FormEvent) {
        e.preventDefault()

        if(!title || weekDays.length === 0) { return }

        await api.post("habits", {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        toast.success("Hábito criado com sucesso", { style: { background: "#18181B", color: "#fff" } })

        close()
    }

    function handleToggleWeekDay(weekDay: number) {
        if(weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day != weekDay)
            setWeekDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]
            setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>
            <input 
                type="text" 
                id="title" 
                placeholder="Exercícios, dormir 8 bem, etc..." 
                autoFocus
                value={title}
                className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                onChange={e => setTitle(e.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {
                    availableWeekDays.map((day, i) => (
                        <Checkbox.Root
                         onCheckedChange={() => handleToggleWeekDay(i)} 
                         key={day} 
                         className='flex items-center gap-3 group focus:outline-none'
                         checked={weekDays.includes(i)}
                        >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-green-500 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900'>
                                <Checkbox.Indicator>
                                <Check size={20} className="text-white"/>
                                </Checkbox.Indicator >
                            </div>
        
                            <span className='text-white leading-tight'>
                                {day}
                            </span>
                        </Checkbox.Root>
                    ))
                }
            </div>

            <button 
             type="submit"
             className="mt-6 rounded-lg p-4 flex items-center justify-center font-semibold bg-green-600 gap-3 hover:bg-green-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={20} weight="bold"/>
                Confirmar
            </button>
        </form>
    )
}