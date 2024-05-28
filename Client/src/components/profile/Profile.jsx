import { AuthContext } from "../../context/AuthContext.jsx"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PhoneIcon from "@mui/icons-material/Phone"
import EditIcon from "@mui/icons-material/Edit"
import styles from "./profile.module.scss"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import i18next from "i18next"
import { useTranslation } from "react-i18next"
import axios from "axios"
import useFetch from "../../../../admin/src/hooks/useFetch.js"

const User = () => {
  const { user } = useContext(AuthContext)
  const { t, i18n } = useTranslation()
  const [list, setList] = useState([])
  const handleEditClick = () => {
    setIsEditing(true)
    // Дополнительные действия при нажатии на кнопку редактирования
  }
  const [me, setMe] = useState([])

  // useEffect(() => {
  //   // Function to fetch instructors from backend when component mounts
  //   const GetMe = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/api/students/me"
  //       ) // Make GET request to backend
  //       setMe(response.data.data) // Set instructors state with data from backend
  //     } catch (error) {
  //       console.error("Error fetching instructors:", error)
  //     }
  //   }

  //   GetMe() // Call the fetchInstructors function
  // }, [])

  const { data, deleteData, patchData } = useFetch(
    `http://localhost:3000/api/students/me`
  )
  console.log("user", data)
  useEffect(() => {
    setList(data.data)
  }, [data])
  return (
    <div>
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profilePhoto}>
            <AccountCircleIcon style={{ fontSize: 250, color: "#003580" }} />
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.name}>
              {user.data.userData.name} {user.data.userData.surname}
            </h2>
            {user.data.userData.vehicleCategory && (
              <div className={styles.profileItem}>
                <DirectionsCarIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.vehicleCategory", { ns: "pages" })}:
                </span>

                <span className={styles.profileItemTextBd}>
                  {user.data.userData.vehicleCategory}
                </span>
              </div>
            )}
            {user.data.userData.city && (
              <div className={styles.profileItem}>
                <LocationCityIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.city", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {user.data.userData.city}
                </span>
              </div>
            )}
            {user.data.userData.dateOfBirth && (
              <div className={styles.profileItem}>
                <CalendarTodayIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.dateOfBirth", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {user.data.userData.dateOfBirth}
                </span>
              </div>
            )}
            {user.data.userData.phone && (
              <div className={styles.profileItem}>
                <PhoneIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.phone", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {user.data.userData.phone}
                </span>
              </div>
            )}
          </div>
        </div>

        <button className={styles.editButton} onClick={handleEditClick}>
          <EditIcon />
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default User
