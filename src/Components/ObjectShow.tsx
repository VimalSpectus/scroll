import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';

const ObjectShow = () => {

    let navigate = useNavigate();
    const location = useLocation();
    const objects =  location.state;
    

    const handleClick=() =>{
        navigate("/");
    }

  return (
    <div>
        <h1>Object Show</h1>
        <p>
           {JSON.stringify(objects)}
        </p>
        <Button variant="contained" onClick={handleClick}>Back To DataShow</Button>
    </div>
  )
}

export default ObjectShow