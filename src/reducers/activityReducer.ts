import { Activity } from "../types"

export type ActivityActions = {
    type:'save-activity'
    payload: {newActivity:Activity}
}
type ActiviState = {
    activities:Activity[]
}

export const initialState : ActiviState  = {
    activities:[]
}
export const activityReducer = (
    state:ActiviState = initialState,
    action:ActivityActions
) => {
    if(action.type === 'save-activity'){
        //este codgio manega el state
        
        
        return{
            ...state,
            activities:[...state.activities,action.payload.newActivity]
        }

    }
    return state;
    
   
}