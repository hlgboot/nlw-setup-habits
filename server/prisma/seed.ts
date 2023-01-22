import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const HabitCreationDate = new Date('2022-12-31T03:00:00.000')

const journalHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'

const workoutHabitId = '00880d75-a933-4fef-94ab-e05744435297'

const readHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'

const meditateHabitId = '030c65c4-b985-4a59-b1d5-691242fbdc15'


async function run() {
  await prisma.habit.deleteMany()
  await prisma.day.deleteMany()

  /**
   * Create habits
   */
  await Promise.all([
    prisma.habit.create({
      data: {
        id: journalHabitId,
        title: 'Journaling',
        created_at: HabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: workoutHabitId,
        title: 'Workout',
        created_at: HabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: readHabitId,
        title: 'Reading',
        created_at: HabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: meditateHabitId,
        title: 'Meditate',
        created_at: HabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        }
      }
    })
  ])

  await Promise.all([
    /**
     * Habits (Complete/Available): 4/4
     */
    prisma.day.create({
      data: {
        /** 1st */
        date: new Date('2023-01-01T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: workoutHabitId },
            { habit_id: readHabitId },
            { habit_id: meditateHabitId },
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 3/4
     */
    prisma.day.create({
      data: {
        /** 2nd */
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 3/4
     */
    prisma.day.create({
      data: {
        /** 3rd */
        date: new Date('2023-01-03T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 2/4
     */
    prisma.day.create({
      data: {
        /** 4th */
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
          ]
        }
      }
    }),
    
    /**
     * Habits (Complete/Available): 4/4
     */
    prisma.day.create({
      data: {
        /** 5th */
        date: new Date('2023-01-05T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
            { habit_id: workoutHabitId }
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 3/4
     */
    prisma.day.create({
      data: {
        /** 6th */
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: workoutHabitId },
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 3/4
     */
    prisma.day.create({
      data: {
        /** 7th */
        date: new Date('2023-01-07T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: workoutHabitId },
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 4/4
     */
    prisma.day.create({
      data: {
        /** 8th */
        date: new Date('2023-01-08T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
            { habit_id: workoutHabitId }
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 3/4
     */
    prisma.day.create({
      data: {
        /** 9th */
        date: new Date('2023-01-09T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: workoutHabitId },
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 2/4
     */
    prisma.day.create({
      data: {
        /** 10th */
        date: new Date('2023-01-10T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: workoutHabitId },
          ]
        }
      }
    }),    
    
    /**
     * Habits (Complete/Available): 4/4
     */
    prisma.day.create({
      data: {
        /** 11th */
        date: new Date('2023-01-11T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
            { habit_id: workoutHabitId }
          ]
        }
      }
    }),

    /**
     * Habits (Complete/Available): 4/4
     */
    prisma.day.create({
      data: {
        /** 12th */
        date: new Date('2023-01-12T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
            { habit_id: workoutHabitId }
          ]
        }
      }
    }),    

    /**
     * Habits (Complete/Available): 4/4
     */
    prisma.day.create({
      data: {
        /** 13th */
        date: new Date('2023-01-13T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
            { habit_id: workoutHabitId }
          ]
        }
      }
    }),
    
    /**
     * Habits (Complete/Available): 2/4
     */
    prisma.day.create({
      data: {
        /** 14th */
        date: new Date('2023-01-14T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
          ]
        }
      }
    }),     

    /**
     * Habits (Complete/Available): 2/4
     */
    prisma.day.create({
      data: {
        /** 15th */
        date: new Date('2023-01-15T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: journalHabitId },
            { habit_id: meditateHabitId },
          ]
        }
      }
    }), 

    /**
     * Habits (Complete/Available): 3/4
     */
    prisma.day.create({
      data: {
        /** 16th */
        date: new Date('2023-01-16T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
            { habit_id: workoutHabitId }
          ]
        }
      }
    }),
    
    /**
     * Habits (Complete/Available): 2/4
     */
    prisma.day.create({
      data: {
        /** 17th */
        date: new Date('2023-01-17T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: meditateHabitId },
            { habit_id: workoutHabitId }
          ]
        }
      }
    }),
    
    /**
     * Habits (Complete/Available): 3/4
     */
    prisma.day.create({
      data: {
        /** 19th */
        date: new Date('2023-01-19T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: meditateHabitId },
            { habit_id: readHabitId },
            { habit_id: workoutHabitId }
          ]
        }
      }
    }),
    
    /**
     * Habits (Complete/Available): 1/4
     */
    prisma.day.create({
      data: {
        /** 20th */
        date: new Date('2023-01-20T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: workoutHabitId }
          ]
        }
      }
    }), 

  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })