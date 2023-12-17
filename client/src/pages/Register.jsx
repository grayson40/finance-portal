import { useState } from 'react'
import '../styles/forms.css'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthValue } from '../context/AuthContext'

export default function Register () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuthValue();
  const navigate = useNavigate()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords do not match')
      }
    }
    return isValid
  }

  const register = (e) => {
    e.preventDefault();
    setError('');
    if (validatePassword()) {
      // Send a POST request to the backend register endpoint
      fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response
          if (data.error) {
            setError(data.error);
          } else {
            // Store the JWT token and user info in context
            login(data.token, data.user);
            navigate('/');
          }
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input
            type='name'
            value={name}
            placeholder='Enter your name'
            required
            onChange={e => setName(e.target.value)}
          />

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
