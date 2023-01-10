import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarverService from './services/MarverService';

import './style/style.scss';

const marverService = new MarverService();

marverService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

