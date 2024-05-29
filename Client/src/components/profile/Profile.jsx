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
import useFetch from "../../hooks/useFetch.js"

const User = () => {
  const { user } = useContext(AuthContext)
  const { t, i18n } = useTranslation()
  const [list, setList] = useState([])
  const handleEditClick = () => {
    setIsEditing(true)
    // Дополнительные действия при нажатии на кнопку редактирования
  }
  const [me, setMe] = useState([])
  // const fetchStudentData = async () => {
  //   try {
  //     // Выполнение GET запроса
  //     const response = await axios.get("http://localhost:3000/api/students/me")

  //     // Обработка успешного ответа
  //     console.log("Данные студента:", response.data)

  //     // Возвращаем данные студента
  //     return response.data
  //   } catch (error) {
  //     // Обработка ошибки
  //     console.error("Ошибка при выполнении запроса:", error)
  //     throw error // Пробрасываем ошибку для обработки в другом месте, если необходимо
  //   }
  // }
  // fetchStudentData()
  //   .then(studentData => {
  //     // Обработка полученных данных студента
  //     console.log("Полученные данные студента:", studentData)
  //   })
  //   .catch(error => {
  //     // Обработка ошибок
  //     console.error("Ошибка получения данных студента:", error)
  //   })
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
              {user.userDataname} {user.userDatasurname}
            </h2>
            {user.userDatavehicleCategory && (
              <div className={styles.profileItem}>
                <DirectionsCarIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.vehicleCategory", { ns: "pages" })}:
                </span>

                <span className={styles.profileItemTextBd}>
                  {user.userDatavehicleCategory}
                </span>
              </div>
            )}
            {user.userDatacity && (
              <div className={styles.profileItem}>
                <LocationCityIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.city", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {user.userDatacity}
                </span>
              </div>
            )}
            {user.userDatadateOfBirth && (
              <div className={styles.profileItem}>
                <CalendarTodayIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.dateOfBirth", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {user.userDatadateOfBirth}
                </span>
              </div>
            )}
            {user.userDataphone && (
              <div className={styles.profileItem}>
                <PhoneIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.phone", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {user.userDataphone}
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
