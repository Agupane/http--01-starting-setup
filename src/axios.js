import axios from 'axios';

/** Create a instance of axios **/
const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN_FROM_INSTANCE';

export default instance;