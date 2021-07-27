import React, { useState, useEffect } from 'react';

import classes from './listIndicator.module.css';

const List = (props) => {

    const { exitCoin, indicatorObj, name} = { ...props }

    //const [coinSymbol, setCoinSymbol] = useState('');
    //const [coin_id, setCoin_id] = useState('');
  


    return (
        <div className={classes.movie}>
            <div className={classes.topPart} >
                <h2>{indicatorObj.symbol}</h2>
                <button className={classes.btn} onClick={() => { exitCoin(indicatorObj._id) }}>Exit</button >

            </div>
            <div className={classes.group}>
                <h3>ID: {indicatorObj._id}</h3>
                <h3>Indicator: {indicatorObj.indicator}</h3>
                <h3>Interval: {indicatorObj.interval} </h3>
                <h3>Interval_metric: {indicatorObj.interval_metric} </h3>

            </div>

        </div>
    );
};

export default List;