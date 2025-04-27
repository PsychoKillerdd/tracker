import  { useMemo } from 'react'

import { Activity } from '../types'

type CalorieTrackerProps = {
    activities: Activity[]
}
export default function CaloriesTracker ({activities}:CalorieTrackerProps) {
const caloriesConsumend = useMemo(() => activities.reduce((total,activity) => activity.category === 1 ? total + activity.calories : total,0 ),[activities])
const caloriesBurned = useMemo(() => activities.reduce((total,activity) => activity.category === 2 ? total + activity.calories : total,0 ),[activities])
const netCalories = useMemo(() => caloriesConsumend - caloriesBurned ,[activities] )
 
    return (
   <>
        <h2 className='text-4xl font-black text-white text-center'>
                Resumen de calorias
        </h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10 ">
        <p  className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
            <span className='font-black text-6xl text-orange-200'>
            {caloriesConsumend}
            </span>
            Consumidas
        </p>
        <p  className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
            <span className='font-black text-6xl text-orange-200'>
            {caloriesBurned}
            </span>
            Quemadas
        </p>
        <p  className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
            <span className='font-black text-6xl text-orange-200'>
            {netCalories}
            </span>
            Diferencia
        </p>
        </div>
       
   </>
  )
}
