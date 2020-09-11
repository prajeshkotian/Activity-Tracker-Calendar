// JavaScript source code
import React from 'react'
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";


const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    console.log('Loading');
    return promiseInProgress &&
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}
        >

        <Loader type="TailSpin" color="black" height="20%" width="30%" />
        </div>
};

export default LoadingIndicator