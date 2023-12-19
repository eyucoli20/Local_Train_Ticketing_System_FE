// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://train-ticketing.onrender.com/',
});

export default instance;