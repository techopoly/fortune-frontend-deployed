import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';



import './App.css';
import Form from './components/Form';
import Lists from './components/Lists';
import Symbol from './components/Symbol';




function App(props) {


  const [coinName, setCoinName] = useState('');
  const [threshold, setThreshold] = useState(0);
  const [indicator, setIndicator] = useState('');
  const [interval, setInterval] = useState(0);
  const [interval_metric, setInterval_metric] = useState('');
  const [currentCoins, setCurrentCoins] = useState([]);
  const [currentEnterCoins, setCurrentEnterCoins] = useState([]);
  const [currentIndicator, setCurrentIndicator] = useState([])
  const [id, setId] = useState('');



  const fetchCurrentCoins = async () => {

    const url = process.env.REACT_APP_BACKEND_URL + '/getCurrentCoins';
    //http://localhost:8080
    // const url = 'http://localhost:8080/getCurrentCoins';


    const response = await axios.post(url);
    const currentCoinsArray = response.data.currentCoins;
    console.log(currentCoinsArray);
    setCurrentCoins(currentCoinsArray);
  }

  const fetchCurrentEnterCoins = async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/getCurrentEnterCoins';
    //const url = 'http://localhost:8080/getCurrentEnterCoins';

    const response = await axios.post(url);
    const currentEnterCoinsArray = response.data.currentEnterCoins;
    console.log(currentEnterCoinsArray);
    setCurrentEnterCoins(currentEnterCoinsArray);
  }


  const fetchCurrentIndicator = async () => {
    const url = process.env.REACT_APP_BACKEND_2_URL + '/indicator/getCurrentIndicator';
    //const url = 'http://localhost:8080/getCurrentEnterCoins';

    const response = await axios.get(url);
    const currentIndicatorArray = response.data;
    console.log(currentIndicatorArray);
    setCurrentIndicator(currentIndicatorArray);
  }


  useEffect(() => {

    fetchCurrentCoinConditionaly();

  }, []);

  const start = () => {
    if (coinName) {
      createCoin()
        .then(result => {
          console.log('createCoin_response: ', result);
          return result
        })
        .then((result) => {
          // const _id = result.coin._id;
          // setId(_id);
          fetchCurrentCoinConditionaly();
        })

    }
  }


  const fetchCurrentCoinConditionaly = () => {

    if (props.name === 'Create') {
      fetchCurrentCoins();
      console.log('fetchCurrentCoinConditionaly')
    }
    if (props.name === 'Enter') {
      fetchCurrentEnterCoins();
      console.log('fetchCurrentCoinConditionaly')
    }
    if (props.name === 'Indicator') {
      fetchCurrentIndicator();
      console.log('fetchCurrentCoinConditionaly');
    }

  }


  const createCoin = async () => {
    let url;
    let data;
    try { } catch (err) { }
    switch (props.name) {
      case ('Create'):
        url = process.env.REACT_APP_BACKEND_URL + '/createCoin'
        data = {
          symbol: coinName,
          threshold: threshold
        }
        break;
      case ('Enter'):
        url = process.env.REACT_APP_BACKEND_URL + '/enterCoin'
        data = {
          symbol: coinName,
          threshold: threshold
        }
        break;
      case ('Indicator'):
        const param = `symbol=${coinName}&indicator=${indicator}&interval=${interval}&interval_metric=${interval_metric}`
        console.log(param)
        url = process.env.REACT_APP_BACKEND_2_URL + `/indicator/createIndicator?${param}`
        data = {}
        break;
      default:
        throw new Error('no policy matched(eg: Create,Enter)')
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
    const url = process.env.REACT_APP_BACKEND_URL + '/getCoin';
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
    let url;
    switch (props.name) {
      case ('Create'):
        url = process.env.REACT_APP_BACKEND_URL + `/exit?_id=${id}`
        break;
      case ('Enter'):
        url = process.env.REACT_APP_BACKEND_URL + `/exitEnter?_id=${id}`
        break;
      case ('Indicator'):
        url = process.env.REACT_APP_BACKEND_2_URL + `/indicator/exitIndicator?_id=${id}`
        break;
      default:
        throw new Error('no policy matched(eg: Create,Enter)')
    }

    // const response = await fetch(url, {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   }
    // });
    // const response = await axios.post(url);
    // console.log(response.data);
    // fetchCurrentCoinConditionaly();
    // console.log('exit_id: ', id);
    axios.post(url)
      .then((response) => {
        console.log(response.data);
        fetchCurrentCoinConditionaly();
        console.log('exit_id: ', id);
        return response
      })
      .catch(err => {
        console.log(err)
      })

    //return response.json()
  }





  const onCoinNameHandler = (event) => {
    console.log("Coin Name: " + event.target.value);
    let name = event.target.value;
    setCoinName((prevState) => {
      console.log(name);
      return name;
    })
  }
  const onIndicatorHandler = (event) => {
    console.log("Indicator: " + event.target.value);
    let name = event.target.value;
    setIndicator((prevState) => {
      console.log(name);
      return name;
    })
  }

  const onIntervalHandler = (event) => {
    console.log("Interval: " + event.target.value);
    let name = event.target.value;
    setInterval((prevState) => {
      console.log(name);
      return name;
    })
  }

  const onInterval_metricHandler = (event) => {
    console.log("Interval_metric " + event.target.value);
    let name = event.target.value;
    setInterval_metric((prevState) => {
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


  let list = (<Lists currentCoins={currentCoins} exitCoin={exitCoin} name={'Create'} />)
  if (props.name === 'Enter') {
    list = (<Lists currentCoins={currentEnterCoins} exitCoin={exitCoin} name='Enter' />)
  } else if (props.name === 'Indicator') {
    list = (<Lists currentCoins={currentIndicator} exitCoin={exitCoin} name={'Indicator'} />)
  }

  let form = props.name === 'Indicator' ? (<Form
    onCoinNameHandler={onCoinNameHandler}
    onIndicatorHandler={onIndicatorHandler}
    onIntervalHandler={onIntervalHandler}
    onInterval_metricHandler={onInterval_metricHandler}
    start={start}
    name={props.name}
  />) : (<Form
    onThresholdHandler={onThresholdHandler}
    onCoinNameHandler={onCoinNameHandler}
    start={start}
    name={props.name}
  />)

  return (
    <React.Fragment>
      <section className='middle'>
        <h1>{props.name}</h1>
        {form}
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
