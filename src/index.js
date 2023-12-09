// //index.js

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App'; // Adjust the path based on your project structure

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



