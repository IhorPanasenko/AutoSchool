import React, { useState } from "react"
import dayjs from "dayjs"
import styles from "./lessons.module.scss"
import { Link } from "react-router-dom"

const LessonsList = ({ filteredLessons }) => {
  const [selectedLessonId, setSelectedLessonId] = useState(null)
  const [chosenLessonId, setChosenLessonId] = useState(null)

  const selectLesson = id => {
    setSelectedLessonId(id)
    setChosenLessonId(id)
  }

  const chooseLesson = () => {
    // setChosenLessonId(selectedLessonId)
    console.log(chosenLessonId)
  }

  // Sort lessons by fromHour
  const sortedLessons = filteredLessons.sort((a, b) => {
    const fromHourA = dayjs(a.fromHour, "HH:mm")
    const fromHourB = dayjs(b.fromHour, "HH:mm")
    return fromHourA.isBefore(fromHourB) ? -1 : 1
  })

  return (
    <div>
      <ul className={styles.calendarContainer}>
        {sortedLessons.map(lesson => {
          const isChosen = lesson._id === chosenLessonId
          const isUnavailable = !!lesson.student
          let className = styles.available

          if (isUnavailable) {
            className = styles.unavailable
          } else if (isChosen) {
            className = styles.chosen
          }

          return (
            <div
              key={lesson._id}
              className={className}
              onClick={() => !isUnavailable && selectLesson(lesson._id)}
              //   style={{
              //     border:
              //       lesson._id === selectedLessonId && !isUnavailable
              //         ? "3px solid #003580"
              //         : "none"
              //   }}
            >
              <li
              //
              >
                {dayjs(lesson.date).format("MMMM D, YYYY")}
              </li>
              <p>
                {lesson.fromHour}- {lesson.toHour}
              </p>
            </div>
          )
        })}
      </ul>
      <Link
        to={`/timetable/payment/${chosenLessonId}`}
        style={{ textDecoration: "none" }}
      >
        <button
          className={styles.chooseButton}
          onClick={chooseLesson}
          disabled={
            !selectedLessonId ||
            filteredLessons.find(lesson => lesson._id === selectedLessonId)
              ?.student
          }
        >
          Confirm
        </button>
      </Link>
    </div>
  )
}

export default LessonsList
