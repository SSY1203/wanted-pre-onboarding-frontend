import Home from '../page/Home';
import LogOut from '../page/LogOut';
import SignIn from '../page/SignIn';
import SignUp from '../page/SignUp';
import ToDo from '../page/ToDo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './../styles/GlobalStyles';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
