import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
const config = require('./common/config.json');
export const apiPath = 'http://' + config.backendPath;

ReactDOM.render(<App />, document.getElementById('root'));