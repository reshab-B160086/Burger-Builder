import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-25912.firebaseio.com/'
});

export default instance;