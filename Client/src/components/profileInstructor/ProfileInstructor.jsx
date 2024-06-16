import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import DriveEtaIcon from "@mui/icons-material/DriveEta"

import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PersonIcon from "@mui/icons-material/Person"
import PhoneIcon from "@mui/icons-material/Phone"
import EditIcon from "@mui/icons-material/Edit"
import styles from "./profileInstructor.module.scss"
import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import useFetch from "../../hooks/useFetch.js"
import { AuthContext } from "../../context/authContext"

const UserInstructor = () => {
  const { t } = useTranslation()
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const { data, patchData, getData } = useFetch()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("http://localhost:3000/api/instructors/me")
        console.log("res", res)
        console.log("res.data.name", res.data.name)

        if (res.data.student) {
          console.log("formData", formData)
        }

        setLoading(false)

        setUserData(res)
      } catch (err) {
        console.error("Failed to fetch lessons my", err)
      }
    }
    fetchData()
  }, [])

  if (!data || !data.data) {
    return <p>No data available</p>
  }
  if (loading) {
    return <p>Loading...</p>
  } else {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profilePhoto}>
            {data.data.photoURL ? (
              <img
                src={data.data.photoURL}
                alt="User Photo"
                className={styles.userPhoto}
              />
            ) : (
              <AccountCircleIcon style={{ fontSize: 250, color: "#003580" }} />
            )}
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.name}>
              {userData.data.name} {userData.data.surname}
            </h2>
            {userData.data.vehicleCategory && (
              <div className={styles.profileItem}>
                <DirectionsCarIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.vehicleCategory", { ns: "pages" })}:
                </span>

                <span className={styles.profileItemTextBd}>
                  {userData.data.vehicleCategory}
                </span>
              </div>
            )}
            {userData.data.city && (
              <div className={styles.profileItem}>
                <LocationCityIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.city", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {userData.data.city.nameUA}
                </span>
              </div>
            )}
            {userData.data.currentNumOfStudents && (
              <div className={styles.profileItem}>
                <PersonIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.countStudents", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {userData.data.currentNumOfStudents} /{" "}
                  {userData.data.maxNumOfStudents}
                </span>
              </div>
            )}
            {userData.data.car.model && (
              <div className={styles.profileItem}>
                <DriveEtaIcon style={{ color: "#003580" }} />
                <span className={styles.profileItemText}>
                  {t("profile.phone", { ns: "pages" })}:
                </span>
                <span className={styles.profileItemTextBd}>
                  {userData.data.car.model}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default UserInstructor
