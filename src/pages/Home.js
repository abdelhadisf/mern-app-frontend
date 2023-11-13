
import { useEffect } from "react";
import WorkoutDetails from "../components/workoutDetails"
import WorkoutForm from "../components/workoutsForm"
import {useWorkoutsContext} from '../components/hooks/useWorkoutsContext'
import {useAuthContext} from '../components/hooks/useAuthContext'


const Home = () => {

    // destructure context comming from useWorkoutsContext state

   const  { workouts , dispatch } = useWorkoutsContext() ;
  const {user} = useAuthContext();





// fetch data from api


useEffect( () => {
    const fetchWorkouts = async () =>{
        const response = await fetch('/api/workouts', {
             headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();
        if(response.ok) {
            dispatch({type : 'SET_WORKOUTS' , payload : json })
        }

    }
    if(user) {
        fetchWorkouts()
    }
    
}, [dispatch,user] )


    return (

        <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout.id} workout={workout}/>
            )
            )}
        </div>
                <WorkoutForm />
        </div>
    )
}

export default Home ; 