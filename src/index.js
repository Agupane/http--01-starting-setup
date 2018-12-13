import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

/** Uses base URL **/
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/** Register new interceptor **/
axios.interceptors.request.use(requestConfig=>{
    console.log("Request config: ", requestConfig);
    /** Always return to avoid block it, here we can also modify the request **/
    return requestConfig;
}, error=>{
    console.log("Request error ", error);
    return Promise.reject(error);
});

axios.interceptors.response.use(responseConfig=>{
    console.log("Response config: ", responseConfig);
    /** Always return to avoid block it, here we can also modify the request **/
    return responseConfig;
}, error=> {
    console.log("Response error ", error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
