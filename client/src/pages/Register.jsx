import { useState } from 'react'
import '../styles/forms.css'
import { auth, db } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth'
import { useAuthValue } from '../context/AuthContext'
import { addDoc, collection } from 'firebase/firestore'

export default function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setTimeActive } = useAuthValue()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = (e) => {
    e.preventDefault()
    setError('')
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigate('/verify-email')
            })
            .catch(err => alert(err.message))
        })
        .catch(err => setError(err.message))

      // Post new user data to firestore
      addUser(email)
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const addUser = async (email) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: email
      })
      console.log('User document written with ID: ', docRef.id)
    } catch (err) {
      console.error('Error adding user document: ', err)
    }
  }

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input
            type='email'
            value={email}
            placeholder='Enter your email'
            required
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}
          />

          <input
            type='password'
            value={confirmPassword}
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <button type='submit'>Register</button>
        </form>
        <span>
          <br></br>
          {`Already have an account? `}
          <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
  )
}
