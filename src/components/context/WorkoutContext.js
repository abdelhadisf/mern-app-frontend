import {createContext,useReducer} from 'react'

// create the context 

export const WorkoutsContext = createContext();

//we made that to keep local state in sync with database

export const workoutsReducer = (state,action ) => {
    //  the previous state before we makin the change to it and the action of dispatch 
    // inside of this action typically check the action type

    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts : action.payload
                //payload in this case whould be array of all the workouts
            }
        case'CREATE_WORKOUT' :
            return {
                workouts :[ action.payload , ...state.workouts]
                // payload a single new workout object 
            }
            case'DELETE_WORKOUT' : 
                return{
                    workouts : state.workouts.filter((w) => w._id !== action.payload._id )
                }
            default : 
                return state

        
    }

}



export const WorkoutsContextProvider = ( { children } ) => {

    const [state,dispatch] = useReducer(workoutsReducer,{
        workouts : null});
        // if we want to update the state object first of all we call dispatch function

        // inside dispatch function we pass an objeCt as argument shoud have type properti that describe in worlds the state change that we wonna make
        // and the second properti is the payload represent any data we need to make this change 
        
        // when we call the dispatch function in turn our reducer function is invoke 
        //it passes the action into reducer function so that can update the state using that information and data

    return(
        // we need to provide the state an dispatch function to be valubale to our component 
        <WorkoutsContext.Provider    value={{...state,dispatch}}>

            { children }

        </WorkoutsContext.Provider>
    )
}

// children property is the root app component
