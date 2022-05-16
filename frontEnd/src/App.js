import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/home';
import EditPage from './pages/editpage/editPage';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/edit' element={<EditPage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
