import React, { useState, useEffect } from 'react';

import classes from './list.module.css';

const List = (props) => {

    const {_id, exitCoin, name} = {...props}

    //const [coinSymbol, setCoinSymbol] = useState('');
    //const [coin_id, setCoin_id] = useState('');
    const [coin, setCoin] = useState({});
    const [growth, setGrowth] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [symbol, setSymbol] = useState('')





    const getCoin = async (_id) => {
        
        
        const url = name === "Create" ? 'http://localhost:8080/getCoin' :'http://localhost:8080/getEnterCoin' ;
        const data = {
            _id: _id
        }

        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        console.log('getCoin_data: ', data);
        const coin = response.json();
        console.log(coin)
        return coin;
    }


    function fetchPrice() {
        let symbol; // using symbo locally 

        setCoin(preCoin => {
            setSymbol(preCoin.symbol === 'doge' ? "dogecoin" : "matic-network")
            setSymbol((prevSymbol) => {
                console.log('symbol: ', prevSymbol);
                symbol = prevSymbol; // setting the symbol using latest symbol by using setSymbol()
                return prevSymbol;
            })
            return preCoin;
        })
        return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data; // returns object containing price
            })
    }


    useEffect(() => {

        getCoin(props._id)
            .then(response => {
                setCoin(response.coin);
                console.log(response.coin);
                return response
            })
            .then((response) => {
                const startPrice = response.coin.startPrice
                console.log(startPrice);
                fetchPrice()
                    .then(result => {
                        console.log(result);
                        setSymbol(prevSymbol => {
                            const currentPrice = result[prevSymbol].usd;
                            console.log('current Price: ', currentPrice)
                            setCurrentPrice(currentPrice);
                            const profit = ((currentPrice - startPrice) / startPrice) * 100;
                            setGrowth(profit.toFixed(5));
                            return prevSymbol;
                        })
                    })

            })

    }, [])






    return (
        <div className={classes.movie}>
            <div className={classes.topPart} >
                <h2>{coin.symbol}</h2>
                <button className={classes.btn} onClick={()=>{exitCoin(_id)}}>Exit</button >

            </div>
            <div className={classes.group}>
                <h3>ID: {coin._id}</h3>
                <h3>Start Price: {coin.startPrice}</h3>
                <h3> Current Price: {currentPrice} </h3>
                <h3>Growth: {growth} %</h3>

            </div>

        </div>
    );
};

export default List;