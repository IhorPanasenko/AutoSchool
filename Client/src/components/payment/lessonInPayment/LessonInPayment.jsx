import React from "react"
import styles from "./lessonInPayment.module.scss"
import EventIcon from "@mui/icons-material/Event"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { useTranslation } from "react-i18next"

const LessonInPayment = ({ lesson }) => {
  const { date, fromHour, toHour, instructorId, price, isAvailable } = lesson
  const { _id, name, surname, photoURL, available, id } = instructorId
  const { t } = useTranslation()

  return (
    <div>
      <h2 className={styles.title}>
        {t("lessonInPayment.h2", { ns: "pages" })}
      </h2>
      <div className={styles.card}>
        <img
          className={styles.media}
          src={photoURL}
          alt={`${{ name }} ${{ surname }}`}
        />
        <div>
          <div className={styles.title}>
            {t("lessonInPayment.instructor", { ns: "pages" })}{" "}
            {lesson.instructorId.name} {lesson.instructorId.surname}
          </div>

          <div className={styles.details}>
            <EventIcon
              className={styles.icon}
              style={{ fontSize: 30, color: "#003580" }}
            />
            <span className={styles.text}>
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.details}>
            <AccessTimeIcon
              className={styles.icon}
              style={{ fontSize: 30, color: "#003580" }}
            />
            <span className={styles.text}>
              {fromHour} - {toHour}
            </span>
          </div>

          <div className={styles.price}>
            {t("lessonInPayment.price", { ns: "pages" })} {price} ₴
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonInPayment
