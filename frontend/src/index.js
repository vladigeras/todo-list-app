import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './component/AppComponent';

//bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.css';

//font awesome
import '../node_modules/font-awesome/css/font-awesome.css';

import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

ReactDOM.render(<AppComponent />, document.getElementById('root'));
