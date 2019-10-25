import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage/MainPage'
import axios from 'axios'
import store from './store/store'

require('dotenv').config();
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MainPage />
    </Provider>
  </BrowserRouter>,
  rootElement);


