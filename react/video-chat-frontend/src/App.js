import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Room from './Pages/Room'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
/* 	  <Routes>
		  <Route path='/' element={<Home />} />
		  <Route path='/room/:id' element={<Room />} />
	  </Routes> */

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>Video Chat</code> version 0.1.0.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
 
	
  );
}

export default App;
