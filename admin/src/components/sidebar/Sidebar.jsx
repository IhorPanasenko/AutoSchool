import "./sidebar.scss"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import GroupIcon from "@mui/icons-material/Group"
import StoreIcon from "@mui/icons-material/Store"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { Link } from "react-router-dom"
import { DarkModeContext } from "../../context/darkModeContext"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext)
  const { user } = useContext(AuthContext)

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    const cookies = document.cookie.split(";")

    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
    }
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">{user.userData.name}</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>
          <Link to="/instructors" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Instructors</span>
            </li>
          </Link>
          <Link to="/cities" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Cities</span>
            </li>
          </Link>
          <Link to="/students/requests" style={{ textDecoration: "none" }}>
            <li>
              <DirectionsCarIcon className="icon" />
              <span>Requests</span>
            </li>
          </Link>

          {/*<Link to="/warehouses" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Warehouses</span>
            </li>
          </Link>
          <Link to="/reservations" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Reservations</span>
            </li>
          </Link> */}
          <p className="title">USER</p>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  )
}

export default Sidebar
