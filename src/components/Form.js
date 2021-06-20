import React from 'react';
import classes from './form.module.css'


const Form = (props) => {

    const {onCoinNameHandler,  onThresholdHandler, start} = {...props};

    return (
        <div className={classes.wrapper}>
            <div className={classes.right} >
                
                    <div className={`${classes.group}`}>
                        <input type="text" placeholder="Coin Name (eg: dogecoin)" onChange={onCoinNameHandler} />
                        <input type="text" placeholder="Threshold (eg: 0.95)" onChange={onThresholdHandler} />
                        {/* <input type="text" placeholder="Start Value (eg: 0.58) " onChange={onStartValueHandler} /> */}
                    </div>
                    <div className={`${classes.group}`}>
                       
                        <input type="text" placeholder="" />
                    </div>
                    <div className={classes.center}>
                        <button onClick={start}className={classes.btn}>Start</button >
                    </div>
               
            </div>
        </div>
    )

}


export default Form;