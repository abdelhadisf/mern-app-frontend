import React,{useState} from 'react'
import { useSignup } from '../components/hooks/useSignup';

const Signup = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const{signup,error,isLoading} = useSignup()


    // we will send a request so because of that we made async function
    const handleSubmit = async (e) => {
         // when we submit the form the default behavior is to refresh the page in a browser 
    // so we want the prevent that 
            e.preventDefault();
            await signup(email,password)


    }


    return(
        
        <form className="signup"  onSubmit={ handleSubmit }>
                <h3>Sign Up</h3>
                <label>Email:</label>
                <input
                    type="email" 
                    onChange={(e)=> setEmail(e.target.value) }
                    value={email}
                />


                <label>Password:</label>
                <input
                    type="password" 
                    onChange={(e)=> setPassword(e.target.value) }
                    value={password}
                />
                 <button disabled={ isLoading }>Sign up</button>
                 {error && <div className='error'> {error} </div>}

        </form>

    )



}



export default Signup ; 