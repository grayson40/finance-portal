import '../styles/profile.css'
import { useAuthValue } from '../context/AuthContext'

export default function Profile () {
  const { user } = useAuthValue()

  return (
    <>
      <h1>Profile</h1>
      <p>
        <strong>Name: </strong>
        {`${user?.Name}`}
      </p>
      <p>
        <strong>Email: </strong>
        {user?.Email}
      </p>
    </>
  )
}
