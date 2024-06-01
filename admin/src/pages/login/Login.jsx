import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./login.scss"

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const { user, loading, error, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

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
      if (res.data.data.userData.role == "admin") {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data })
        console.log("aaaaaaaaaaaaaa", res)
        navigate("/")
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" }
        })
        console.log(res)
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }
  console.log(user)

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login
