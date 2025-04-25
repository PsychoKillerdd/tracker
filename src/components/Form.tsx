import { Dispatch, useState } from "react"
import {v4 as uuidv4} from 'uuid'

import { categories } from '../db/categories';
import { Activity } from "../types";
import { ActivityActions, initialState } from '../reducers/activityReducer';
type FormProps = {
    dispatch:Dispatch<ActivityActions>
}

const initialState = {
    id:uuidv4(),
    category:1,
    name:'',
    calories:0

}
export default function Form({dispatch}:FormProps) {
const [activity,SetActivity] = useState<Activity>(initialState)
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const isNumberFill = ['category','calories'].includes(e.target.id)
    console.log(isNumberFill)
    SetActivity({
        ...activity,
        [e.target.id]:isNumberFill ? +e.target.value : e.target.value
    })
 }

 const isValid = () => {
    const {name,calories} = activity
    return name.trim() !== '' && calories > 0
 }
const handleSubmit = (e :  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type:'save-activity',payload:{newActivity:activity}})
    SetActivity({...initialState,id:uuidv4()

    })
}
    return (
    <>
        <form 
        action=""
        className="space-y-5 bg-white shad ow p-10 rounded-lg"
        onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria: </label>
                <select 
                name="" 
                id="category" 
                value={activity.category} 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                onChange={handleChange}
                >

                            {categories.map((categories) => (
                                <option key={categories.id}  value={categories.id}>
                                    {categories.name}
                                </option>                                                                
                            ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad: </label>
            <input 
            type="text" 
            id="name"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej.Comida,Jugo de naranja,Ensalada,Ejercicio,Pesas,Bicicletas."
            value={activity.name}
            onChange={handleChange}
            />
            </div>
            <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias: </label>
            <input 
            type="number" 
            id="calories"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej.300 o 500."
            value={activity.calories}
            onChange={handleChange}
            />
            </div>
            <input 
            type="submit"       
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValid()}
            />
        </form>
    </>
  )
}
