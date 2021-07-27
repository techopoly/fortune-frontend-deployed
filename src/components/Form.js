import React from 'react';
import classes from './form.module.css'


const Form = (props) => {
    let content;
    if(props.name === 'Indicator'){
        const {onCoinNameHandler, onIndicatorHandler, onIntervalHandler, onInterval_metricHandler, start} = {...props};
        content = (
            <div className={classes.right} >
                
                    <div className={`${classes.group}`}>
                        <input type="text" placeholder="Symbol (eg: doge)" onChange={onCoinNameHandler} />
                        <input type="text" placeholder="Indicator (eg: rsi )" onChange={onIndicatorHandler} />

                    </div>
                    <div className={`${classes.group}`}>
                    <input type="text" placeholder="Interval (eg: 1,5) " onChange={onIntervalHandler} />
                    <input type="text" placeholder="Interval_metric (eg: m, h) " onChange={onInterval_metricHandler} />
                    </div>
                    <div className={classes.center}>
                        <button onClick={start}className={classes.btn}>Start</button >
                    </div>
               
            </div>
        )
    }else{
        const {onCoinNameHandler,  onThresholdHandler, start} = {...props};
        content = (
            <div className={classes.right} >
                
                    <div className={`${classes.group}`}>
                        <input type="text" placeholder="Coin Name (eg: dogecoin)" onChange={onCoinNameHandler} />
                        <input type="text" placeholder="Threshold (eg: 0.95)" onChange={onThresholdHandler} />
                        {/* <input type="text" placeholder="Start Value (eg: 0.58) " onChange={onStartValueHandler} /> */}
                    </div>
                    {/* <div className={`${classes.group}`}>
                       
                        <input type="text" placeholder="" />
                    </div> */}
                    <div className={classes.center}>
                        <button onClick={start}className={classes.btn}>Start</button >
                    </div>
               
            </div>
        )
    }

    return (
        <div className={classes.wrapper}>
          {content}
        </div>
    )

}


export default Form;