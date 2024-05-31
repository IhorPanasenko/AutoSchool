import Navbar from "../../components/navbar/Navbar"

import styles from "./timetable.module.scss"
import { Link } from "react-router-dom"
import User from "../../components/profile/Profile"
import TimetableUser from "../../components/timetable/Timetable"

const Timetable = () => {
  return (
    <div>
      <Navbar />
      {/* <User /> */}
      {/* <TimetableUser closingDate={new Date(2021, 2, 28)} /> */}
      <TimetableUser />
    </div>
  )
}

export default Timetable
