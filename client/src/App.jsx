import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Expenses from './pages/Expenses'
import Home from './pages/Home'
import Investments from './pages/Investments'
import Income from './pages/Income'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './components/VerifyEmail'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { auth } from './firebase'
import Layout from './components/Layout'

function App () {
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <div className='App'>
      <Router>
        <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <PrivateRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/expenses'
              element={
                <PrivateRoute>
                  <Layout>
                    <Expenses />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/income'
              element={
                <PrivateRoute>
                  <Layout>
                    <Income />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/investments'
              element={
                <PrivateRoute>
                  <Layout>
                    <Investments />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/profile'
              element={
                <PrivateRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path='/login'
              element={
                !currentUser?.emailVerified ? (
                  <Login />
                ) : (
                  <Navigate to='/' replace />
                )
              }
            />
            <Route
              path='/register'
              element={
                !currentUser?.emailVerified ? (
                  <Register />
                ) : (
                  <Navigate to='/' replace />
                )
              }
            />
            <Route path='/verify-email' element={<VerifyEmail />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
