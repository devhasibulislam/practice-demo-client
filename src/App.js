import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './routes/Login/Login';
import Register from './routes/Login/Register';
import Reset from './routes/Login/Reset';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './shared/Navbar';
import Home from './routes/Home/Home';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <section className="App">
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path='/home'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/reset'
          element={<Reset />}
        />
      </Routes>
      <ToastContainer />
    </section>
  );
}

export default App;
