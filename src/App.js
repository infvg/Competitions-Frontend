import './App.css';

import Home from './sites/home.js';
import Create from './sites/create';
import {Routes,
  Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      
      

      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/create" element={<Create/>} />
      </Routes>
    </div>

  );
}

export default App;
