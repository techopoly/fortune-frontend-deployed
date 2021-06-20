import React from 'react';

import classes from './priceCard.module.css';

const PriceCard = (props) => {
  return (
    <div className={classes.movie}>
      <h2>{props.name}</h2>
      <h3>{props.price}</h3>
    </div>
  );
};

export default PriceCard;