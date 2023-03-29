import '../styles/profile.css'
import { useAuthValue } from '../context/AuthContext'

export default function Profile () {
  const { currentUser } = useAuthValue()

  return (
    <>
      <h1>Profile</h1>
      <p>
        <strong>Email: </strong>
        {currentUser?.email}
      </p>
      <p>
        <strong>Email verified: </strong>
        {`${currentUser?.emailVerified}`}
      </p>
    </>
  )
}
