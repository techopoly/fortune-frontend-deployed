import React from 'react';

import classes from './symbol.module.css'


const Lists = (props) => {


    return (
        <div className={classes.wrapper}>
            <h1>Symbols</h1>
            <ul>
                <li>doge</li>
                <li>matic</li>
            </ul>

        </div>
    )
}


export default Lists;