import './App.css';

import Home from './sites/home.js';
import Create from './sites/create';
import {Routes,
  Route} from 'react-router-dom'
import Modify from './sites/modify';
import { SnackbarProvider } from 'notistack';
import Track from './sites/track';

function App() {
  return (
    <SnackbarProvider>
    <div className="App">
      
      

      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/track" element={<Track/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/modify" element={<Modify/>} />
      </Routes>
    </div>
    </SnackbarProvider>

  );
}

export default App;
