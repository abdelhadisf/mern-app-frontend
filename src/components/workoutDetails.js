import { useState } from "react";
import { useWorkoutsContext } from "./hooks/useWorkoutsContext";
import {useAuthContext} from '../components/hooks/useAuthContext'



const WorkoutDetails = ({workout}) => {

    const [error,setError] = useState(null) ;
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    const handleClick = async() => {
        if(!user) {
           return
        }
        const response = await fetch('/api/workouts/' + workout._id ,
        {method : 'DELETE',
        headers : {
            'Authorization' : `Bearer ${user.token}`
        }}
        );

        const json = await response.json();

        if(!response.ok) {
            setError(json.error);

        }
        if(response.ok) {
            setError(null);

            dispatch({type:'DELETE_WORKOUT',payload : json})
            
            console.log('workout deleted',json)
        }
    } 

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>load(kg) :</strong> {workout.load}</p>
            <p><strong>Number of reps : </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>delete</span>
            {error && <div className="error">{error}</div> }
        </div>
        )
}



export default WorkoutDetails