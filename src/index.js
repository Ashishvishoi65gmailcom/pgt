import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Importing global styles
import App from './App'; // Main App component
import reportWebVitals from './reportWebVitals'; // For measuring performance
import ContextProvider from './context/Context'; // Context provider for state management

// Create the root element and render the React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
