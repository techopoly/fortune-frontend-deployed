import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';



import './App.css';
import Form from './components/Form';
import Lists from './components/Lists';
import Symbol from './components/Symbol';




function App(props) {


  const [coinName, setCoinName] = useState('');
  const [threshold, setThreshold] = useState(0);
  const [currentCoins, setCurrentCoins] = useState([]);
  const [currentEnterCoins, setCurrentEnterCoins] = useState([]);
  const [id, setId] = useState('');



  const fetchCurrentCoins = async () => {

    const url = 'http://localhost:8080/getCurrentCoins';

    const response = await axios.post(url);
    const currentCoinsArray = response.data.currentCoins;
    console.log(currentCoinsArray);
    setCurrentCoins(currentCoinsArray);
  }

  const fetchCurrentEnterCoins = async () => {

    const url = 'http://localhost:8080/getCurrentEnterCoins';

    const response = await axios.post(url);
    const currentEnterCoinsArray = response.data.currentEnterCoins;
    console.log(currentEnterCoinsArray);
    setCurrentEnterCoins(currentEnterCoinsArray);
  }



  useEffect(() => {
    if (props.name === 'Create') {
      fetchCurrentCoins();
    }
    else if (props.name === 'Enter') {
      fetchCurrentEnterCoins();
    }

  }, []);

  const start = () => {
    if (coinName) {
      createCoin()
        .then(result => {
          console.log('createCoin_response: ', result);
          return result
        })
        .then((result) => {
          const _id = result.coin._id;
          setId(_id);
         fetchCurrentCoinConditionaly();
        })

    }
  }


  const fetchCurrentCoinConditionaly = () => {

    if(props.name === 'Create'){
      fetchCurrentCoins();
      console.log('fetchCurrentCoinConditionaly')
    }
    if(props.name === 'Enter'){
      fetchCurrentEnterCoins();
      console.log('fetchCurrentCoinConditionaly')
    }

  }


  const createCoin = async () => {

    const url = props.name === 'Create' ? 'http://localhost:8080/createCoin' : 'http://localhost:8080/enterCoin';

    const data = {
      symbol: coinName,
      threshold: threshold
    }

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log('createCoin_data: ', data);
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const getCoin = async (_id) => {
    const url = 'http://localhost:8080/getCoin';
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
    return response.json()
  }


  const exitCoin = async (id) => {

    const url = props.name === 'Create' ? `http://localhost:8080/exit?_id=${id}` : `http://localhost:8080/exitEnter?_id=${id}`;

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    fetchCurrentCoins();
    fetchCurrentEnterCoins();
    console.log('exit_id: ', id);
    return response.json()
  }





  const onCoinNameHandler = (event) => {
    console.log("Coin Name: " + event.target.value);
    let name = event.target.value;
    setCoinName((prevState) => {
      console.log(name);
      return name;
    })
  }



  const onThresholdHandler = (event) => {
    console.log("threshold" + event.target.value)
    let threshold = event.target.value;
    setThreshold((prevState) => {
      console.log(threshold);
      return threshold;
    })
  }


  let list = (<Lists currentCoins={currentCoins} exitCoin={exitCoin} name='Create' />)
  if (props.name === 'Enter') {
    list = (<Lists currentCoins={currentEnterCoins} exitCoin={exitCoin} name='Enter' />)
  }

  return (
    <React.Fragment>
      <section className='middle'>
        <h1>{props.name}</h1>
        <Form onThresholdHandler={onThresholdHandler}
          onCoinNameHandler={onCoinNameHandler}
          start={start}
        />
        {list}
        <button onClick={fetchCurrentCoinConditionaly} >Fetch Current Coins</button>
        <Symbol />
      </section>

    </React.Fragment>
  );
}

/* <section className="middle">
<PriceCard price={price} name={"Price"} />
</section>
<section><PriceCard price={peak} name={"Peak"} /></section>
<section><Alert number={alert ? 1 : 0} name={"Alarm"} /></section>
<p>{coinName}</p> */

export default App;
