import { Text, View, ScrollView, Alert } from "react-native";
import { useCallback, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import dayjs from "dayjs";
import { api } from "../lib/axios";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";

import {generateDatesFromYearBeggining} from "../utils/generate-dates-from-year-begginning"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearBeggining = generateDatesFromYearBeggining()
const minimumSummaryDatesSize = 10 * 7
const amountOfDayToFill = minimumSummaryDatesSize - datesFromYearBeggining.length

type SummaryProps = {
    id: string,
    date: string,
    completed: number,
    amount: number
}[]

export function Home() {

    const { navigate } = useNavigation()

    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<SummaryProps>([])

    useFocusEffect(useCallback(() => {fecthData()}, []))

    async function fecthData() {
        try {
            setLoading(true)
            const response = await api.get("/summary")
            setSummary(response.data)
            
        } catch (error) {
            Alert.alert('Ops!', 'Não foi possível carregar os hábitos')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if(loading) { return (<Loading />) }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row ml-auto mt-6">
                {
                    weekDays.map((weekDay, i) => 
                        <Text key={i} 
                        className="text-zinc-400 text-xl font-bold text-center mx-1"
                        style={{width: DAY_SIZE}}
                        >
                            {weekDay}
                        </Text>
                    )
                }
            </View>


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100}}>    
                <View className="flex-row flex-wrap mt-2">
                    { 
                        datesFromYearBeggining.map(date => {
                            const dayWithHabits = summary.find(day => dayjs(date).isSame(day.date))

                            return (
                                <HabitDay 
                                 key={date.toISOString()}
                                 onPress={() => navigate("habit", { date: date.toISOString() })}
                                 date={date}
                                 completed={dayWithHabits?.completed}
                                 amount={dayWithHabits?.amount}
                                />
                            )
                        })
                    }
                    {
                        amountOfDayToFill > 0 && Array
                        .from({length: amountOfDayToFill})
                        .map((_, i) => { return (
                            <View
                            key={i} 
                            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                            style={{width: DAY_SIZE, height: DAY_SIZE}}
                            />
                        )})
                    }
                </View>
            </ScrollView>

        </View>
    )
}