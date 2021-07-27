import React from 'react';
import List from './List';
import classes from './lists.module.css'
import ListIndicator from './ListIndicator';


const Lists = (props) => {

    let content = <h1>No coin enlisted</h1>

    if (props.currentCoins.length > 0) {

        if (props.name === 'Indicator') {
            content = props.currentCoins.map(eachCoin => (
                <ListIndicator
                    key={eachCoin._id}
                    exitCoin={props.exitCoin}
                    indicatorObj={eachCoin}
                    name = {props.name}
                />
            ))

        } else {
            content = props.currentCoins.map((eachCoin) => (
                <List 
                key={eachCoin._id} 
                _id={eachCoin.coin_id} 
                exitCoin={props.exitCoin} 
                name={props.name} />
            ))
        }

    }

    return (
        <div className={classes.wrapper}>
            {content}
        </div>
    )
}


export default Lists;