import { Dispatch, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from '../db/categories';
import { Activity } from "../types";
import { ActivityActions } from '../reducers/activityReducer';

// Definimos la estructura del estado aquí si no está exportada correctamente
interface State {
  activities: Activity[];
  activeId: string | null;
}

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: State
}

const formInitialState = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {
    const [activity, setActivity] = useState<Activity>(formInitialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        console.log(isNumberField);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        });
    };

    const isValid = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'save-activity', payload: { newActivity: activity } });
        setActivity({
            ...formInitialState,
            id: uuidv4()
        });
    };

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.find((stateActivity: Activity) => stateActivity.id === state.activeId);
            if (selectedActivity) {
                setActivity(selectedActivity);
            }
        }
    }, [state.activeId]);

    return (
        <>
            <form
                action=""
                className="space-y-5 bg-white shadow p-10 rounded-lg"
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
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
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
    );
}
