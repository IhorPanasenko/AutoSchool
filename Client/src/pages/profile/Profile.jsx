import Navbar from "../../components/navbar/Navbar"
import User from "../../components/profile/Profile"
import ProfileEmail from "../../components/profile/profileEmail/ProfileEmail"

const Profile = () => {
  return (
    <div>
      <Navbar />
      <ProfileEmail />
      <User />
    </div>
  )
}

export default Profile
