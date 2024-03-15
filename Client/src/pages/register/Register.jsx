// import Featured from "../../components/featured/Featured"
// import Footer from "../../components/footer/Footer"
// import Header from "../../components/header/Header"
// import MailList from "../../components/mailList/MailList"
// import Navbar from "../../components/navbar/Navbar"
// import Car from "../../assets/loginCar.svg"
import CarImg from "../../assets/registerBackgr.png"
import IcoGoogle from "../../assets/googleIco.svg"

import styles from "./register.module.scss"
import { Link } from "react-router-dom"
import { useState } from "react"

const Register = () => {
  const [userData, setUserData] = useState({
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_wrapper}>
        <img src={CarImg} alt="Car" className={styles.menu__icon} />
        <div className={styles.inputs_container}>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={userData.firstName}
            onChange={handleChange}
            className={styles.input_base}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={userData.lastName}
            onChange={handleChange}
            className={styles.input_base}
          />
        </div>
        <div className={styles.inputs_container}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleChange}
            className={styles.input_base}
          />
          <div className={styles.date_container}>
            {/* <label className={styles.date_label}>Date of Birth:</label> */}
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleChange}
              className={styles.input_base}
            />
          </div>
        </div>
        <div className={styles.inputs_container}>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={userData.city}
            onChange={handleChange}
            className={styles.input_base}
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone"
            value={userData.phoneNumber}
            onChange={handleChange}
            className={styles.input_base}
          />
        </div>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={userData.password}
          onChange={handleChange}
          className={styles.input_base}
        />
        {/* <input
          type="password"
          placeholder="Continue with google"
          className={styles.contGoogle}
        /> */}
        <button className={styles.contGoogle}>
          <img
            src={IcoGoogle}
            alt="IcoGoogle"
            className={styles.menu_icoGoogle}
          />
          Continue with google
        </button>

        <Link
          to="/"
          style={{ textDecoration: "none" }}
          className={styles.link_btn_logIn}
        >
          {/* <p className={styles.menu_text}>
            {t("navbar.linkreviews", { ns: "pages" })}
          </p> */}
          <button className={styles.btn_logIn}>Get Started</button>
        </Link>
        <div className={styles.txtAcoouunt}>
          <p className={styles.txtAcoouunt_noLink}>Have an account?</p>
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            className={styles.link_registration}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
