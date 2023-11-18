import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; //BrowserRouter 페이지 이동을 위한 컨포넌트

const root = ReactDOM.createRoot(document.getElementById('root'));
// index.html.에 아래 root.render를 넣는다.
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* App을 감싸고 있어야 사용 가능하다. */}
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
