import React from 'react';

import { WorkoutsContextProvider } from './components/context/WorkoutContext'
import { AuthContextProvider } from './components/context/AuthContext'

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  <React.StrictMode>

    <AuthContextProvider>


        <WorkoutsContextProvider>

              <App />
    
        </WorkoutsContextProvider>

    </AuthContextProvider>
    
  </React.StrictMode>
);


