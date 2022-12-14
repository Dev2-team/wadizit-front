import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Test from './components/Test';
import Join from './components/Join';
//import Home from './components/Home';



function App() {
  return (
    <div className="App">
      {/* <Join/> */}
      
      <Router>
        {/* <Join/> */}
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/join" element={<Join />} /> */}
          <Route path="/Test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
