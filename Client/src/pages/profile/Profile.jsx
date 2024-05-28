import Navbar from "../../components/navbar/Navbar"

import Back from "../../assets/mobile.avif"
import Back2 from "../../assets/back.png"

import styles from "./profile.module.scss"
import { Link } from "react-router-dom"
import User from "../../components/profile/Profile"

const Profile = () => {
  return (
    <div>
      <Navbar />
      <User />
    </div>
  )
}

export default Profile
