import { Activity } from "../types"

export type ActivityActions = {

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
    
   
}