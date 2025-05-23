import Form from "./components/Form";
import { useReducer, useEffect, useMemo } from "react";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from './components/ActivityList';
import CaloriesTracker from "./components/CaloriesTracker";

export default function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);
  
  const canR = useMemo(() => state.activities.length > 0, [state.activities]);
  
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold uppercase">
            Contador de calorias
          </h1>
          <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-2xl text-sm disabled:opacity-10"
            disabled={!canR}
            onClick={() => dispatch({ type: 'restart' })}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList  
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
        <CaloriesTracker
        activities={state.activities}
        
        />

        </div>
      </section>
    </>
  );
}