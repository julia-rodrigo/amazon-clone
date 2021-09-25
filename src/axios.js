import axios from 'axios';

const instance = axios.create({
    // local api endpoint
    baseURL: 'http://localhost:5001/again-d5564/us-central1/api' // the api (cloud fuction) url 
});

export default instance;