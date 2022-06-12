import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from './Firebase/context';
import Firebase from './Firebase/Firebase';

ReactDOM.render(
    <React.StrictMode>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
