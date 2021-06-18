import React from 'react';
import './App.css';
import Navigation from './components/Navbar';
import NavigationAfterLogin from './components/NavBarAfterLogin';

import Routes from './Routes';

if(process.env.NODE_ENV === 'development') {
  var url = 'http://localhost:5000'
}

if(process.env.NODE_ENV === 'production') {
  var url = ''
}
function App() {
  const isLoggedin = sessionStorage.getItem("token")
  return (
    <div className="App">
      <div className="container">
        {
          isLoggedin ? 
          (<NavigationAfterLogin />)
          : 
          (<Navigation />)
        }
      <Routes />
      </div>
    </div>
  );
}

export default App;
