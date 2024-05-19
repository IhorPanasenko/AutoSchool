import { AuthContext } from "../../context/AuthContext.jsx"

import styles from "./profile.module.scss"
import { Link } from "react-router-dom"
import { useContext } from "react"

const User = () => {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <p>{user.data.userData.name}</p>
      <p>{user.data.userData.surname}</p>
      <p>{user.data.userData.phone}</p>
      <p>{user.data.userData.dateOfBirth}</p>

      <p>djdddj</p>
    </div>
  )
}

export default User
