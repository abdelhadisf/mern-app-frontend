import React,{useState} from 'react'
import { useLogin } from '../components/hooks/useLogin';

const Login = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const{login,error,isLoading} = useLogin()


   
    // we will send a request so because of that we made async function
    const handleSubmit = async (e) => {
         // when we submit the form the default behavior is to refresh the page in a browser 
    // so we want the prevent that 
            e.preventDefault();
            await login(email,password)
             console.log( email, password )

    }


    return(
        
        <form className="login"  onSubmit={ handleSubmit }>
                <h3>Login</h3>
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

                <button disabled={isLoading}>Log in</button>
                {error && <div className='error'> {error} </div>}
        </form>

    )



}



export default Login ; 