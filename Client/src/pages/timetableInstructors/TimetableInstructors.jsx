import Navbar from "../../components/navbar/Navbar"

import { Link } from "react-router-dom"
import User from "../../components/profile/Profile"
import TimetableUser from "../../components/timetable/Timetable"
import TimetableForInstructor from "../../components/timetableInstructor/TimetableForInstructor"

const TimetableInstructor = () => {
  return (
    <div>
      <Navbar />

      {/* <TimetableUser /> */}
      <TimetableForInstructor />
    </div>
  )
}

export default TimetableInstructor
