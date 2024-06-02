// import Featured from "../../components/featured/Featured"
// import Footer from "../../components/footer/Footer"
// import Header from "../../components/header/Header"
// import MailList from "../../components/mailList/MailList"
import InstructorsList from "../../components/instructor/Instructor"
import Navbar from "../../components/navbar/Navbar"

import styles from "./instructors.module.scss"

const Instructors = () => {
  return (
    <div>
      <Navbar />

      {/* <Header /> */}
      {/* <div className="homeContainer">
        <Featured />
        <MailList />
        <Footer />
      </div> */}
      {/* <h1>Instructors</h1> */}
      <InstructorsList />
    </div>
  )
}

export default Instructors
