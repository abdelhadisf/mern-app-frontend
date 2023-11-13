import { useState } from "react";
import { useWorkoutsContext } from "./hooks/useWorkoutsContext";
import {useAuthContext} from '../components/hooks/useAuthContext'


const WorkoutsForm = () => {
    const {dispatch} = useWorkoutsContext();
    const [title,setTitle] = useState() ;
    const [load,setLoad] = useState() ;
    const [reps,setReps] = useState() ;
    const [error,setError] = useState(null) ;
    const [emptyField,setEmptyField] = useState();

    const {user} = useAuthContext();

    const handleSubmit = async (e) => {
       
        // prevent the default action of the form being submited
        e.preventDefault();

        if(!user) {
            setError('You must be logged in')
            return
        
        }
        const workout = {title ,load, reps};
        // fetch request

        const response = await fetch('/api/workouts',
        {   method : 'POST' , 
            body:JSON.stringify(workout) ,
            headers :{
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${user.token}`
                    }  
        })

        // storing the response comming from Api

        const json = await response.json() ;

        // getting error message

        if(!response.ok) {
            setError(json.error);
            setEmptyField(json.emptyField);

        }

        // getting succes message

        if(response.ok) {

            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            dispatch({type:'CREATE_WORKOUT' ,payload : json})
            console.log('workout added',json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercice Title :</label>
            <input
            type="text" 
            onChange={(e)=> {setTitle(e.target.value)}}
            value = {title}
            />

            <label>Load in (Kg) :</label>
            <input
            type="Number" 
            onChange={(e)=> {setLoad(e.target.value)}}
            value = {load}
            />

            <label>Reps:</label>
            <input
            type="Number" 
            onChange={(e)=> {setReps(e.target.value)}}
            value = {reps}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div> }

        </form>

    )
}



export default WorkoutsForm 