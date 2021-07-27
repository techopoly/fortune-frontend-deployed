import React, { useState, useEffect } from 'react';

import classes from './list.module.css';

const List = (props) => {

    const { _id, exitCoin, name } = { ...props }

    //const [coinSymbol, setCoinSymbol] = useState('');
    //const [coin_id, setCoin_id] = useState('');
    const [coin, setCoin] = useState({});
    const [growth, setGrowth] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [symbol, setSymbol] = useState('')



    useEffect(() => {
        let interval;
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
                            const currentPrice = result.price
                            console.log('current Price: ', currentPrice)
                            setCurrentPrice(currentPrice);
                            const profit = ((currentPrice - startPrice) / startPrice) * 100;
                            setGrowth(profit.toFixed(5));
                            return prevSymbol;
                        })
                    });
                interval = startInterval()

            })

        return () => {
            console.log('cleanup')
            clearInterval(interval);
        }



    }, [])



    const getCoin = async (_id) => {
        let url;
        switch (name) {
            case "Create":
                url = process.env.REACT_APP_BACKEND_URL + '/getCoin';
                break;
            case "Enter":
                url = process.env.REACT_APP_BACKEND_URL + '/getEnterCoin';
                break;
            // case "Indicator" :
            //     url = process.env.REACT_APP_BACKEND_URL + '/getEnterCoin';
            //     break;
            default:
                throw new Error('no policy matched(eg: Create,Enter)')
        }
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
            symbol = preCoin.symbol
            return preCoin;
        })
        return fetch(process.env.REACT_APP_BACKEND_2_URL + `/price?symbol=${symbol}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data; // returns object containing price
            })
    }





    const updateEverything = () => {
        let startPrice;
        setCoin(prevCoin => {
            startPrice = prevCoin.startPrice;
            return prevCoin;
        })

        console.log('[updateEverything]')
        fetchPrice()
            .then(result => {
                console.log(result);
                const currentPrice = result.price
                console.log('current Price: ', currentPrice)
                setCurrentPrice(currentPrice);
                const profit = ((currentPrice - startPrice) / startPrice) * 100;
                setGrowth(profit.toFixed(5));


            })
    }

    const startInterval = () => {
        const interval = setInterval(updateEverything, 5000);
        return interval;
    }






    return (
        <div className={classes.movie}>
            <div className={classes.topPart} >
                <h2>{coin.symbol}</h2>
                <button className={classes.btn} onClick={() => { exitCoin(_id) }}>Exit</button >

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