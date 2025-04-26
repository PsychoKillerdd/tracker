import { Activity } from "../types"

export type ActivityActions =
    | {
        type: 'save-activity'
        payload: {newActivity: Activity}
      }
    | {
        type: 'set-activeId'
        payload: {id: Activity['id']}
      }

type ActiviState = {
    activities: Activity[],
    activeId: Activity['id']
}

export const initialState: ActiviState = {
    activities: [],
    activeId: ''
}

export const activityReducer = (
    state: ActiviState = initialState,
    action: ActivityActions
) => {
    if(action.type === 'save-activity'){
        //este código maneja el state
        let updatedActivities: Activity[] = [];
        
        if(state.activeId){
            updatedActivities = state.activities.map(activity => 
                activity.id === state.activeId ? action.payload.newActivity : activity
            );
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity];
        }
        
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        };
    }
   
    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        };
    }
   
    return state;
}