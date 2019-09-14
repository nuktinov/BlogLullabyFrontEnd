//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './store/reducer'
import MainPage from './components/MainPage/MainPage'
import axios from 'axios'

require('dotenv').config();
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MainPage />
    </Provider>
  </BrowserRouter>,
  rootElement);


