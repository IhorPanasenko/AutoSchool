import React, { useContext, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import StarIcon from "@mui/icons-material/Star"
import styles from "./instructor.module.scss"
import { AuthContext } from "../../context/authContext"
import useFetch from "../../hooks/useFetch"

const InstructorsList = () => {
  const { t, i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  const [nav, setNav] = useState(false)
  const { user } = useContext(AuthContext)
  const { data, deleteData, patchData, error } = useFetch()

  const requestToInstructor = async id => {
    try {
      let result = await patchData(
        `http://localhost:3000/api/students/request-instructor/${id}`
      )
      console.log("result from front ", result)
      if (result.status == "success") {
        const storedData = JSON.parse(localStorage.getItem("user"))
        alert('Запит надіслано успішно');
        storedData.instructor = id
        storedData.requestStatus = "pending"
        localStorage.setItem("user", JSON.stringify(storedData))
        window.location.reload()
        // setList(list.filter(item => item._id !== id))
      } else {
        alert("Не вдалося записатися до інструктора оскільки він вже зайнятий")
      }
      console.log("data from front ", { data })
      console.log("error from front ", { error })

      // setList(list.filter(item => item._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  console.log("my lang" + document.cookie)
  //   const { user } = useContext(AuthContext)
  const [instructors, setInstructors] = useState([])

  useEffect(() => {
    // Function to fetch instructors from backend when component mounts
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/instructors"
        ) // Make GET request to backend
        setInstructors(response.data.data) // Set instructors state with data from backend
      } catch (error) {
        console.error("Error fetching instructors:", error)
      }
    }

    fetchInstructors() // Call the fetchInstructors function
  }, [])
  // Empty dependency array ensures this effect runs only once when component mounts
  console.log("instructors" + instructors)
  const fakeId = 2714781348913789
  return (
    <div className={styles.wrapper}>
      {instructors.map(instructor => (
        <div key={instructor._id} className={styles.wrapper_instructor}>
          {/* <Link
            to={`/instructors/${instructor._id}`}
            style={{ textDecoration: "none" }}
          > */}
          <div className={styles.frame}>
            <img
              src={instructor.car.photoURL}
              alt="Car"
              className={styles.car_img}
            />
          </div>
          <div className={styles.ins_frame}>
            <img
              src={instructor.photoURL}
              alt="Instructor"
              className={styles.instructor_img}
            />
          </div>
          <div className={styles.car_text}>
            <h3 className={styles.car_model}>{instructor.car.model}</h3>
            <h3
              className={styles.name_instructor}
            >{`${instructor.name} ${instructor.surname}`}</h3>
            <h3
              className={styles.car_type}
            >{`Коробка передач: ${instructor.car.transmission}`}</h3>
            <h3 className={styles.car_type}>{`Рік: ${instructor.car.year}`}</h3>
            <div className={styles.price_rating_section}>
              <div className={styles.ratingcontainer}>
                <StarIcon style={{ color: "gold", marginRight: "5px" }} />
                <h3
                  className={styles.rating}
                >{`${instructor.averageRating}/5`}</h3>
              </div>
              <div className={styles.price_section}>
                <h3 className={styles.price_text}></h3>
                <h3 className={styles.price_number}>500₴</h3>
              </div>
            </div>
            {user &&
              user.emailVerificationStatus === "verified" &&
              (user.requestStatus === "unsubmitted" ||
                user.requestStatus === "failed") && (
                <div className={styles.btn_section}>
                  <button
                    className={styles.btn_choose}
                    onClick={() => requestToInstructor(instructor._id)}
                  >
                    {t("instructor.btn", {
                      ns: "pages"
                    })}
                  </button>
                </div>
              )}
          </div>
          {/* </Link> */}
        </div>
      ))}
    </div>
  )
}

export default InstructorsList
