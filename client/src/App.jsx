import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Investments from './pages/Investments';
import Income from './pages/Income';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/income" element={<Income />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
