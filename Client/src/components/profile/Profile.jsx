import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PhoneIcon from "@mui/icons-material/Phone"
import EditIcon from "@mui/icons-material/Edit"
import styles from "./profile.module.scss"
import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import useFetch from "../../hooks/useFetch.js"
import { AuthContext } from "../../context/authContext"

const User = () => {
  const { t } = useTranslation()
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const { data, patchData, getData } = useFetch()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    vehicleCategory: "",
    cityId: "",
    dateOfBirth: "",
    phone: "",
    photo: ""
  })
  const handleEditClick = () => {
    setIsEditing(true)
    // Дополнительные действия при нажатии на кнопку редактирования
  }
  const handleChange = e => {
    const { name, value } = e.target
    if (name === "phone") {
      setFormData({ ...formData, [name]: formatPhoneNumber(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }
  const handlePhotoChange = e => {
    setFormData({ ...formData, photo: e.target.files[0] })
    setFormData({ ...formData, photo: e.target.files[0] })
  }

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cities")
        console.log("response city", response.data.data)
        setCities(response.data.data)
      } catch (error) {
        console.error("Error fetching cities:", error)
      }
    }

    fetchCities()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (formData.photo) {
        const photoData = new FormData()
        photoData.append("photo", formData.photo)

        let result = await patchData(
          `http://localhost:3000/api/students/updateMyPhoto`,
          photoData
        )
        console.log("result photo", result)
      }

      const updateData = {
        name: formData.name,
        surname: formData.surname,
        vehicleCategory: formData.vehicleCategory,
        cityId: formData.cityId,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone
      }
      console.log("updateData", updateData)

      try {
        let result = await patchData(
          `http://localhost:3000/api/students/updateMe`,
          updateData
        )
        console.log("result updateMe", result)
      } catch (error) {
        console.log("error", error)
      }

      setIsEditing(false)
      const res = getData("http://localhost:3000/api/students/me")
      setUserData(res)
    } catch (error) {
      console.error("Failed to update profile", error)
    }
  }

  // "http://localhost:3000/api/students/me"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("http://localhost:3000/api/students/me")
        console.log("res", res)
        // console.log("res.data.student", res.data.student)

        // console.log(studentData)
        if (res.data.student) {
          setFormData({
            name: res.data.student.name,
            surname: res.data.student.surname,
            vehicleCategory: res.data.student.vehicleCategory,
            cityId: res.data.student.cityId,
            dateOfBirth: res.data.student.userId.dateOfBirth,
            phone: res.data.student.userId.phone,
            photo: res.data.student.photoURL
          })
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

  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  const formatPhoneNumber = value => {
    const cleaned = ("" + value).replace(/\D/g, "")
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-")
    }
    return value
  }

  if (!data || !data.data || !data.data.student) {
    return <p> loading ....</p>
  }
  if (loading) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        {/* {data.data.student ? (
        "loading"
      ) : ( */}
        {!isEditing ? (
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
              {t("profile.btn_edit", { ns: "pages" })}
            </button>
          </div>
        ) : (
          <div className={styles.profileContainer}>
            <div>
              <form
                className={styles.profileContentEdit}
                onSubmit={handleSubmit}
              >
                <div className={styles.allfieldsContainer}>
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
                    <input
                      type="file"
                      name="photo"
                      onChange={handlePhotoChange}
                      className={styles.inputBasePhoto}
                    />
                  </div>
                  <div className={styles.profileInfo}>
                    <div className={styles.df}>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.inputBase}
                      />
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className={styles.inputBase}
                      />
                    </div>
                    {/* <input
                      type="text"
                      name="vehicleCategory"
                      value={formData.vehicleCategory}
                      onChange={handleChange}
                      className={styles.inputBase}
                    /> */}
                    <div className={styles.df}>
                      <select
                        name="vehicleCategory"
                        value={formData.vehicleCategory}
                        onChange={handleChange}
                        className={styles.inputBase}
                      >
                        <option value="">Select vehicle category</option>
                        {["A", "B", "C", "D"].map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {/* <input
                  type="text"
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className={styles.inputBase}
                /> */}
                      <select
                        name="cityId"
                        value={formData.cityId}
                        onChange={handleChange}
                        className={styles.inputBase}
                      >
                        <option value="">Select your city</option>
                        {cities.map(city => (
                          <option key={city._id} value={city._id}>
                            {city.nameEN}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.df}>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={styles.inputBase}
                      />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.inputBase}
                        placeholder="XXX-XXX-XXXX"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className={styles.btnLogIn}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default User
