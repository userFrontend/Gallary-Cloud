import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import Auth from './pages/Auth/Auth';
import {useInfoContext} from './context/InfoContext'
import { useState } from 'react';
import MyPhotos from './pages/MyPhotos/MyPhotos';
import Pictures from './pages/Pictures/Pictures';
import NotFound from './pages/NotFound/NotFound';


function App() {
  const {currentUser} = useInfoContext()
  const [register, setRegister] = useState(false)
  
  return (
    <div className="App">
      {!register && <Header setRegister={setRegister}/>}
        <Routes>
          <Route path='/' element={<Home setRegister={setRegister}/>}/>
          <Route path='/auth' element={<Auth />}/>
          <Route path='/my' element={<MyPhotos/>}/>
          <Route path='/pic' element={<Pictures/>}/>
          <Route path='/pic/:id' element={<Pictures/>}/>
          <Route path='/account' element={currentUser && <Account/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
