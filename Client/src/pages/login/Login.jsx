// import Featured from "../../components/featured/Featured"
// import Footer from "../../components/footer/Footer"
// import Header from "../../components/header/Header"
// import MailList from "../../components/mailList/MailList"
// import Navbar from "../../components/navbar/Navbar"
// import Car from "../../assets/loginCar.svg"
import CarImg from "../../assets/loginBackgr.png"

import styles from "./login.module.scss"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className={styles.login_container}>
      {/* <Navbar /> */}
      <div className={styles.login_wrapper}>
        <img
          src={CarImg}
          alt="Car"
          className={styles.menu__icon}
          //   isDropdownOpen ? styles.show : styles.hide
          // }`}
        />

        {/* <h1>Login</h1> */}
        <input
          type="text"
          placeholder="Enter your email"
          className={styles.email}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className={styles.password}
        />

        <Link
          to="/"
          style={{ textDecoration: "none" }}
          className={styles.link_btn_logIn}
        >
          {/* <p className={styles.menu_text}>
            {t("navbar.linkreviews", { ns: "pages" })}
          </p> */}
          <button className={styles.btn_logIn}>Log in</button>
        </Link>
        <div className={styles.txtAcoouunt}>
          <p className={styles.txtAcoouunt_noLink}>Don’t have any account?</p>
          <Link
            to="/registration"
            style={{ textDecoration: "none" }}
            className={styles.link_registration}
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
