import CarImg from "../../assets/registerBackgr.png"
import IcoGoogle from "../../assets/googleIco.svg"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import Joi from "joi"
import styles from "./register.module.scss"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"

// import { useState } from "react"

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
  const { loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

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
        // Перевірка, щоб поля firstName та lastName містили тільки букви
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
        // Перевірка, щоб пароль містив принаймні одну велику літеру, одну цифру і був довше 6 символів
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
    // Додайте код для відправки даних на сервер
    dispatch({ type: "LOGIN_START" })
    try {
      // Формуємо номер телефону з дефісами
      const formattedPhoneNumber = user.phoneNumber.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1-$2-$3"
      )

      // Дані для відправки
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

      // Відправляємо дані на сервер
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
                placeholder="Enter your first name"
                value={user.firstName}
                onChange={handleChange}
                className={styles.input_base}
              />
              {errors.firstName && (
                <span className={styles.error_message}>{errors.firstName}</span>
              )}
            </div>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={user.lastName}
              onChange={handleChange}
              className={styles.input_base}
            />
            {errors.lastName && (
              <span className={styles.error_message}>{errors.lastName}</span>
            )}
          </div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            className={styles.input_base}
          />
          {errors.email && (
            <span className={styles.error_message}>{errors.email}</span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
            className={styles.input_base}
          />
          {errors.password && (
            <span className={styles.error_message}>{errors.password}</span>
          )}
          <div className={styles.inputs_container}>
            <div className={styles.date_container}>
              <input
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleChange}
                className={styles.input_base}
              />
            </div>
            <select
              name="city"
              value={user.city}
              onChange={handleChange}
              className={styles.input_base}
            >
              <option value="">Select your city</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.nameEN}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputs_container}>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone"
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
              <option value="">Select vehicle category</option>
              {vehicleCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.btn_logIn}>
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
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
