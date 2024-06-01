// import { AuthContext } from "../../context/AuthContext.jsx"
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
import useFetch from "../../hooks/useFetch.js"
import { AuthContext } from "../../context/authContext"
// import { AuthContext } from "../../context/AuthContext"

const User = () => {
  const { user } = useContext(AuthContext)
  const { t, i18n } = useTranslation()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const handleEditClick = () => {
    setIsEditing(true)
    // Дополнительные действия при нажатии на кнопку редактирования
  }

  const { data, deleteData, patchData } = useFetch(
    "http://localhost:3000/api/students/me"
  )

  useEffect(() => {
    // Пример использования данных после загрузки
    if (data.status == "success") {
      setLoading(false)
      console.log("User data: ", data)
    }
    console.log("userDATA", data)
    // console.log("userName", data.data.student.name)
  }, [data])

  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  if (loading) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        {/* {data.data.student ? (
        "loading"
      ) : ( */}
        <div className={styles.profileContainer}>
          <div className={styles.profileContent}>
            <div className={styles.profilePhoto}>
              {data.data.student.photoURL ? (
                <img
                  src={data.data.student.photoURL}
                  alt="User Photo"
                  className={styles.userPhoto}
                />
              ) : (
                <AccountCircleIcon
                  style={{ fontSize: 250, color: "#003580" }}
                />
              )}
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.name}>
                {data.data.student.name} {data.data.student.surname}
              </h2>
              {data.data.student.vehicleCategory && (
                <div className={styles.profileItem}>
                  <DirectionsCarIcon style={{ color: "#003580" }} />
                  <span className={styles.profileItemText}>
                    {t("profile.vehicleCategory", { ns: "pages" })}:
                  </span>

                  <span className={styles.profileItemTextBd}>
                    {data.data.student.vehicleCategory}
                  </span>
                </div>
              )}
              {data.data.student.cityId && (
                <div className={styles.profileItem}>
                  <LocationCityIcon style={{ color: "#003580" }} />
                  <span className={styles.profileItemText}>
                    {t("profile.city", { ns: "pages" })}:
                  </span>
                  <span className={styles.profileItemTextBd}>
                    {data.data.student.cityId.nameUA}
                  </span>
                </div>
              )}
              {data.data.student.userId.dateOfBirth && (
                <div className={styles.profileItem}>
                  <CalendarTodayIcon style={{ color: "#003580" }} />
                  <span className={styles.profileItemText}>
                    {t("profile.dateOfBirth", { ns: "pages" })}:
                  </span>
                  <span className={styles.profileItemTextBd}>
                    {formatDate(data.data.student.userId.dateOfBirth)}
                  </span>
                </div>
              )}
              {data.data.student.userId.phone && (
                <div className={styles.profileItem}>
                  <PhoneIcon style={{ color: "#003580" }} />
                  <span className={styles.profileItemText}>
                    {t("profile.phone", { ns: "pages" })}:
                  </span>
                  <span className={styles.profileItemTextBd}>
                    {data.data.student.userId.phone}
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
        {/*) } */}
      </div>
    )
  }
}

export default User
