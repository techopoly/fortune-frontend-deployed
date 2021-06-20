import React from 'react';
import classes from './alert.module.css';

const Alert = (props) => {

  // if{props.number == }
  return (
    <div className={`${classes.movie} ${props.number ? classes.red : classes.green}`}>
      <h2>{props.name}</h2>
      <h3>{props.number}</h3>
    </div>
  );


}


export default Alert;