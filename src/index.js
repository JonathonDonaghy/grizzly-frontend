import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './toastr/toast.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.slim.min.js';
import '../node_modules/popper.js/dist/umd/popper.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/userActions';
import setAuthToken from './utils/setAuthToken';
import store from './store';

// Check for timeout, log user out if needed
// Check for token
if (localStorage.GrizzGoogleToken) {
  //Set auth token header auth
  setAuthToken(localStorage.GrizzGoogleToken);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.GrizzGoogleToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Log user out
    store.dispatch(logoutUser());
    // Redirect
    window.location.href = '/customer';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
