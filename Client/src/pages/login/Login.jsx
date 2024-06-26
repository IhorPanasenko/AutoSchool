import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useTranslation } from "react-i18next"
import CarImg from "../../assets/loginBackgr.png"
import { useLocation } from "react-router-dom"
import styles from "./login.module.scss"
import { Link } from "react-router-dom"

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })
  const { t } = useTranslation()
  const { user, loading, error, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const location = useLocation()

  // Function to parse query parameters
  const getQueryParams = query => {
    return new URLSearchParams(query)
  }

  // Extract the redirectUrl from the query parameters
  const queryParams = getQueryParams(location.search)
  const redirectUrl = queryParams.get("redirectUrl")
  console.log(redirectUrl)

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials,
        { withCredentials: true }
      )
      console.log(res)

      console.log("res.data.details")
      console.log(res.data)
      console.log("res.data.data", res.data.data)

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data })

      if (redirectUrl) {
        console.log("dadada")
        
        //right redirectUrl: "http://localhost:5173/login?redirectUrl=timetable/payment/665afcd8f5f8eb22f8c3a039"

        window.location.href = `${window.location.origin}/${redirectUrl}`;
      } else {
        navigate("/")
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
      console.log(err)
    }
  }
  console.log(user)
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
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className={styles.password}
          id="password"
          onChange={handleChange}
        />

        <Link
          to="/"
          style={{ textDecoration: "none" }}
          className={styles.link_btn_logIn}
        >
          {/* <p className={styles.menu_text}>
            {t("navbar.linkreviews", { ns: "pages" })}
          </p> */}
          <button className={styles.btn_logIn} onClick={handleClick}>
            Log in
          </button>
        </Link>
        <div className={styles.txtAcoouunt}>
          <Link
            to="/forgotPassword"
            style={{ textDecoration: "none" }}
            className={styles.link_registration}
          >
            {t("login.forgotPassword")}
          </Link>
        </div>
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
