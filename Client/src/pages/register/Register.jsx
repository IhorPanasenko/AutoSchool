import CarImg from "../../assets/registerBackgr.png"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import Joi from "joi"
import styles from "./register.module.scss"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Register = () => {
  const [user, setuser] = useState({
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    vehicleCategory: ""
  })
  const [cities, setCities] = useState([])
  const vehicleCategories = ["A", "B", "C", "D"]
  const [errors, setErrors] = useState({})
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleChange = e => {
    const { name, value } = e.target
    setuser({ ...user, [name]: value })
    validateField(name, value)
  }

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cities")
        setCities(response.data.data)
      } catch (error) {
        console.error("Error fetching cities:", error)
      }
    }

    fetchCities()
  }, [])

  const validateField = (name, value) => {
    let errorMessage = ""
    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(value)) {
          errorMessage = "This field should contain only letters"
        }
        break
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Invalid email address"
        }
        break
      case "phoneNumber":
        if (!/^\+?3?8?(0[5-9][0-9]\d{7})$/.test(value)) {
          errorMessage = "Invalid phone number"
        }
        break
      case "password":
        const passwordSchema = Joi.object({
          password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
            .required()
        })
        const { error } = passwordSchema.validate({ password: value })
        if (error) {
          errorMessage =
            "Password must contain at least one uppercase letter, one digit, and be at least 6 characters long"
        }
        break
      case "dateOfBirth":
        const today = new Date()
        const birthDate = new Date(value)
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDifference = today.getMonth() - birthDate.getMonth()
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--
        }
        if (age < 18) {
          errorMessage = "You must be at least 18 years old"
        }
        break
      default:
        break
    }
    setErrors({ ...errors, [name]: errorMessage })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    for (const [name, value] of Object.entries(user)) {
      validateField(name, value)
    }

    if (Object.values(errors).some(error => error)) {
      console.log("Form has errors, please fix them before submitting")
      return
    }

    console.log("Form data is valid, submitting...")

    dispatch({ type: "LOGIN_START" })
    try {
      const formattedPhoneNumber = user.phoneNumber.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1-$2-$3"
      )

      const formData = {
        name: user.firstName,
        surname: user.lastName,
        phone: formattedPhoneNumber,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        password: user.password,
        cityId: user.city.id
      }
      console.log("formData:", formData)

      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        { withCredentials: true }
      )

      console.log("Server response:", response.data.data)
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.data })

      navigate("/")
    } catch (error) {
      console.log("Error submitting form:", error)
      alert(
        "Не вдалося зареєструватися оскільки хтось вже зареєстрований під таким email"
      )
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
    }
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_wrapper}>
        <form onSubmit={handleSubmit}>
          <img src={CarImg} alt="Car" className={styles.menu__icon} />
          <div className={styles.inputs_container}>
            <div className={styles.input_witherr_container}>
              <input
                type="text"
                name="firstName"
                placeholder={t("register.firstName", { ns: "pages" })}
                value={user.firstName}
                onChange={handleChange}
                className={styles.input_base}
              />
              {errors.firstName && (
                <span className={styles.error_message}>{errors.firstName}</span>
              )}
            </div>
            <div className={styles.input_witherr_container}>
              <input
                type="text"
                name="lastName"
                placeholder={t("register.lastName", { ns: "pages" })}
                value={user.lastName}
                onChange={handleChange}
                className={styles.input_base}
              />
              {errors.lastName && (
                <span className={styles.error_message}>{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className={styles.inputs_container}>
            <div className={styles.input_witherr_container}>
              <input
                type="email"
                name="email"
                placeholder={t("register.email", { ns: "pages" })}
                value={user.email}
                onChange={handleChange}
                className={styles.input_base}
              />
              {errors.email && (
                <span className={styles.error_message}>{errors.email}</span>
              )}
            </div>
            <div className={styles.input_witherr_container}>
              <input
                type="password"
                name="password"
                placeholder={t("register.password", { ns: "pages" })}
                value={user.password}
                onChange={handleChange}
                className={styles.input_base}
              />
              {errors.password && (
                <span className={styles.error_message}>{errors.password}</span>
              )}
            </div>
          </div>

          <div className={styles.inputs_container}>
            <div className={styles.input_witherr_container}>
              <div className={styles.date_container}>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  onChange={handleChange}
                  className={styles.input_base}
                />
              </div>
              {errors.dateOfBirth && (
                <span className={styles.error_message}>
                  {errors.dateOfBirth}
                </span>
              )}
            </div>
            <div className={styles.input_witherr_container}>
              <select
                name="city"
                value={user.city}
                onChange={handleChange}
                className={styles.input_base}
              >
                <option value="">{t("register.city", { ns: "pages" })}</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.nameEN}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.inputs_container}>
            <input
              type="tel"
              name="phoneNumber"
              placeholder={t("register.phoneNumber", { ns: "pages" })}
              value={user.phoneNumber}
              onChange={handleChange}
              className={styles.input_base}
            />
            {errors.phoneNumber && (
              <span className={styles.error_message}>{errors.phoneNumber}</span>
            )}
            <select
              name="vehicleCategory"
              value={user.vehicleCategory}
              // onChange={handleCategoryChange}
              className={styles.input_base}
              onChange={handleChange}
            >
              <option value="">
                {t("register.vehicleCategory", { ns: "pages" })}
              </option>
              {vehicleCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.btnLogIn}>
            Get Started
          </button>
        </form>
        <div className={styles.txtAcoouunt}>
          <p className={styles.txtAcoouunt_noLink}>Have an account?</p>
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            className={styles.link_registration}
          >
            {t("register.link_registration", { ns: "pages" })}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
