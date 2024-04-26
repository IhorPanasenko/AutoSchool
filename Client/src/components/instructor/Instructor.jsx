import React, { useContext, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import CarImg1 from "../../assets/CarImg1.png"
import CarImg2 from "../../assets/CarImg2.png"
import CarImg3 from "../../assets/CarImg3.png"

import InstructorImg from "../../assets/man1.png"
import InstructorImg1 from "../../assets/man2.png"

import styles from "./instructor.module.scss"
import i18next from "i18next"
// import { AuthContext } from "../../context/AuthContext.js"
import { Link, useLocation } from "react-router-dom"

const Instructor = () => {
  const { t, i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  const [nav, setNav] = useState(false)
  //   const location = useLocation()

  const changeLanguage = (lang, e) => {
    setSelectedLanguage(lang)
    e.preventDefault()
    i18next.changeLanguage(lang)
    setNav(false)
  }
  const language = i18n.language
  var cookies = document.cookie.split(";")
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("="),
      name = parts[0],
      value = parts[1]
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
  }, []) // Empty dependency array ensures this effect runs only once when component mounts
  console.log("instructors" + instructors.data)
  const fakeId = 2714781348913789
  return (
    // <div className={styles.wrapper}>
    //   <div className={styles.wrapper_instructor}>
    //     <Link
    //       to={`/instructors/${fakeId}`}
    //       style={{ textDecoration: "none" }}
    //       //   className={styles.wrapper}
    //     >
    //       <img src={CarImg1} alt="Car" className={styles.car_img} />
    //       <img
    //         src={InstructorImg}
    //         alt="Instructor"
    //         className={styles.instructor_img}
    //       />

    //       <div className={styles.car_text}>
    //         <h3 className={styles.car_model}>BMV caaaarrrrr</h3>
    //         <h3 className={styles.name_instructor}>Юрій володимирович</h3>
    //         <h3 className={styles.car_type}>Коробка передач: механічна</h3>
    //         <div className={styles.price_rating_section}>
    //           <h3 className={styles.rating}>3/5</h3>
    //           <div className={styles.price_section}>
    //             <h3 className={styles.price_text}>ціна</h3>
    //             <h3 className={styles.price_number}>700 ₴</h3>
    //           </div>
    //         </div>
    //       </div>
    //     </Link>
    //   </div>
    //   <div className={styles.wrapper_instructor}>
    //     <Link
    //       to={`/instructors/${fakeId}`}
    //       style={{ textDecoration: "none" }}
    //       //   className={styles.wrapper}
    //     >
    //       <img src={CarImg2} alt="Car" className={styles.car_img} />
    //       <img
    //         src={InstructorImg}
    //         alt="Instructor"
    //         className={styles.instructor_img}
    //       />

    //       <div className={styles.car_text}>
    //         <h3 className={styles.car_model}>BMV caaaarrrrr</h3>
    //         <h3 className={styles.name_instructor}>Юрій володимирович</h3>
    //         <h3 className={styles.car_type}>Коробка передач: механічна</h3>
    //         <div className={styles.price_rating_section}>
    //           <h3 className={styles.rating}>3/5</h3>
    //           <div className={styles.price_section}>
    //             <h3 className={styles.price_text}>ціна</h3>
    //             <h3 className={styles.price_number}>700 ₴</h3>
    //           </div>
    //         </div>
    //       </div>
    //     </Link>
    //   </div>
    //   <div className={styles.wrapper_instructor}>
    //     <Link
    //       to={`/instructors/${fakeId}`}
    //       style={{ textDecoration: "none" }}
    //       //   className={styles.wrapper}
    //     >
    //       <img src={CarImg3} alt="Car" className={styles.car_img} />
    //       <img
    //         src={InstructorImg}
    //         alt="Instructor"
    //         className={styles.instructor_img}
    //       />
    //       <div className={styles.car_text}>
    //         <h3 className={styles.car_model}>BMV caaaarrrrr</h3>
    //         <h3 className={styles.name_instructor}>Юрій володимирович</h3>
    //         <h3 className={styles.car_type}>Коробка передач: механічна</h3>
    //         <div className={styles.price_rating_section}>
    //           <h3 className={styles.rating}>3/5</h3>
    //           <div className={styles.price_section}>
    //             <h3 className={styles.price_text}>ціна</h3>
    //             <h3 className={styles.price_number}>700 ₴</h3>
    //           </div>
    //         </div>
    //       </div>
    //     </Link>
    //   </div>
    //   <div className={styles.wrapper_instructor}>
    //     <Link
    //       to={`/instructors/${fakeId}`}
    //       style={{ textDecoration: "none" }}
    //       //   className={styles.wrapper}
    //     >
    //       <img src={CarImg1} alt="Car" className={styles.car_img} />
    //       <img
    //         src={InstructorImg1}
    //         alt="Instructor"
    //         className={styles.instructor_img}
    //       />

    //       <div className={styles.car_text}>
    //         <h3 className={styles.car_model}>BMV caaaarrrrr</h3>
    //         <h3 className={styles.name_instructor}>Юрій володимирович</h3>
    //         <h3 className={styles.car_type}>Коробка передач: механічна</h3>
    //         <div className={styles.price_rating_section}>
    //           <h3 className={styles.rating}>3/5</h3>
    //           <div className={styles.price_section}>
    //             <h3 className={styles.price_text}>ціна</h3>
    //             <h3 className={styles.price_number}>700 ₴</h3>
    //           </div>
    //         </div>
    //       </div>
    //     </Link>
    //   </div>
    //   <div className={styles.wrapper_instructor}>
    //     <Link
    //       to={`/instructors/${fakeId}`}
    //       style={{ textDecoration: "none" }}
    //       //   className={styles.wrapper}
    //     >
    //       <img src={CarImg1} alt="Car" className={styles.car_img} />
    //       <img
    //         src={InstructorImg}
    //         alt="Instructor"
    //         className={styles.instructor_img}
    //       />

    //       <div className={styles.car_text}>
    //         <h3 className={styles.car_model}>BMV caaaarrrrr</h3>
    //         <h3 className={styles.name_instructor}>Юрій володимирович</h3>
    //         <h3 className={styles.car_type}>Коробка передач: механічна</h3>
    //         <div className={styles.price_rating_section}>
    //           <h3 className={styles.rating}>3/5</h3>
    //           <div className={styles.price_section}>
    //             <h3 className={styles.price_text}>ціна</h3>
    //             <h3 className={styles.price_number}>700 ₴</h3>
    //           </div>
    //         </div>
    //       </div>
    //     </Link>
    //   </div>
    // </div>
    <div className={styles.wrapper}>
      {instructors.map(instructor => (
        <div key={instructor._id} className={styles.wrapper_instructor}>
          <Link
            to={`/instructors/${instructor._id}`}
            style={{ textDecoration: "none" }}
          >
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
              <h3
                className={styles.car_type}
              >{`Рік: ${instructor.car.year}`}</h3>
              <div className={styles.price_rating_section}>
                <h3
                  className={styles.rating}
                >{`${instructor.averageRating}/5`}</h3>
                <div className={styles.price_section}>
                  <h3 className={styles.price_text}>ціна</h3>
                  <h3 className={styles.price_number}>700 ₴</h3>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Instructor
