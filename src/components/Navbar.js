
import { Link } from "react-router-dom"

import { useLogout } from '../components/hooks/useLogout';
import {useAuthContext} from "./hooks/useAuthContext"

const Navbar = () =>{
    const {logout} = useLogout() ;
    const { user } = useAuthContext();

    const handleClick = () =>  {

        logout();
    }

    return ( 
    <header>
        <div className="container">   

                        
                <Link  to = '/'>
                <h1> Workout Boddy </h1>
                </Link>
                <nav>
                {/* diplay Log out  button only when we have user property */}
                       { user && (
                        <div className="">
                            <span>{user.email}</span>
                        <button  onClick={handleClick}>Log out</button>
                    </div>
                        )
                       } 
                    {/* diplay SignUp and Login button only when the user property does not exist */}

                        { !user && (
                            <div>
                            <Link to='/signup'>SignUp</Link>
                            <Link to='/login'>Login</Link>
                        </div>
                        )
                        }
                        
                </nav>
        </div>
    </header>
    )
}


export default Navbar ;