import { useRoute } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs"
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progres-percentage";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface Params {
    date: string
}

interface DayInfoProps {
    possibleHabits: {
        id: string,
        title: string,
        created_at: string
    }[],
    completedHabits: string[],
}

export function Habit() {
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps>()

    const [progress, setProgress] = useState(0)

    const route = useRoute()
    const { date } = route.params as Params

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    const isDateInPast = dayjs().startOf('day').isAfter(date)

    useEffect(() => { fecthData() }, [])

    async function fecthData() {
        try {
            setLoading(true)

            const {data} = await api.get("/day", { params: { date } })
            setDayInfo(data)

            const pro = generateProgressPercentage({amount: data.possibleHabits.length, completed: data.completedHabits.length})
            setProgress(pro)

        } catch (error) {
            console.log(error)
            Alert.alert("Ops!", "Não foi possível carregar as informações do dia")
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string) {
        try {
            await api.patch(`/habits/${habitId}/toggle`)
        
            const isHabitAlreadyCompleted = dayInfo!.completedHabits.includes(habitId)
    
            let completedHabits: string[] = []
    
            if (isHabitAlreadyCompleted) {
                completedHabits = dayInfo!.completedHabits.filter(id => id !== habitId)
            } else {
                completedHabits = [...dayInfo!.completedHabits, habitId]
            }
    
            setDayInfo({
                possibleHabits: dayInfo!.possibleHabits,
                completedHabits
            })
    
            const pro = generateProgressPercentage({amount: dayInfo!.possibleHabits.length, completed: completedHabits.length})
            setProgress(pro)
        } catch (error) {
            console.log(error)
            Alert.alert("Ops!", "Não foi possível atualizar o hábito")
        }
    }

    if(loading) { return <Loading /> }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100}}>
                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl mt-2">
                    {dayAndMonth}
                </Text>
                
                <ProgressBar progress={progress}/>

                <View className={clsx("mt-6", {
                    "opacity-50": isDateInPast
                })}>
                    
                    { 
                        dayInfo?.possibleHabits ? dayInfo.possibleHabits.map(habit => 
                        <Checkbox
                         key={habit.id} 
                         title={habit.title}
                         disabled={isDateInPast} 
                         checked={dayInfo.completedHabits.includes(habit.id)}
                         onPress={() => handleToggleHabit(habit.id)}
                        />) : <HabitsEmpty />
                    }
                    
                </View>

                {
                    isDateInPast && (
                        <Text className="text-white mt-10 text-center">
                            Você não pode editar hábitos de uma data passada
                        </Text>
                    )
                }

            </ScrollView>
        </View>
    )
}