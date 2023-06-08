import { useState } from 'react';
import Home from './../pages/Home/Home';
import LogOut from './../pages/LogOut';
import SignIn from './../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import ToDo from './../pages/ToDo';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navContext } from './../context/isActive';

function App() {
  const lastActive = localStorage.getItem('nav');
  const [isActive, setIsActive] = useState(lastActive ? lastActive : '');

  const value = { isActive, setIsActive };

  return (
    <div className="App">
      <navContext.Provider value={value}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </BrowserRouter>
      </navContext.Provider>
    </div>
  );
}

export default App;
