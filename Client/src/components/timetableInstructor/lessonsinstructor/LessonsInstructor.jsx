import React, { useState } from "react"
import dayjs from "dayjs"
import styles from "./lessons.module.scss"
import { Link } from "react-router-dom"
import useFetch from "../../../hooks/useFetch"

const LessonsList = ({ filteredLessons }) => {
  const [selectedLessonId, setSelectedLessonId] = useState(null)
  const [chosenLessonId, setChosenLessonId] = useState(null)
  const [canceledLessons, setCanceledLessons] = useState([])
  const { data, deleteData, patchData, getData } = useFetch()

  const selectLesson = id => {
    setSelectedLessonId(id)
    setChosenLessonId(id)
  }

  const chooseLesson = async () => {
    // setChosenLessonId(selectedLessonId)
    console.log(chosenLessonId)
    try {
      let result = await patchData(
        `http://localhost:3000/api/lessons/${chosenLessonId}/cancel`
      )
      console.log("result delete", result)

      if (result.status == "success") {
        // sortedLessons.filter(item => item._id !== id)
        setChosenLessonId(null)
        setCanceledLessons([...canceledLessons, chosenLessonId])
      } else {
        alert(
          "Відмінити урок не вдалося оскільки він вже минув або буде менше ніж за день."
        )
      }
    } catch (err) {
      console.log(err)
      alert("Произошла ошибка при попытке удалить урок.")
    }
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
          const isUnavailable =
            !lesson.isAvailable || canceledLessons.includes(lesson._id)
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
            >
              <li
              //
              >
                {dayjs(lesson.date).format("MMMM D, YYYY")}
              </li>
              <p>
                {lesson.fromHour}- {lesson.toHour}
              </p>
              {lesson.student && (
                <p>
                  {lesson.student.name} {lesson.student.surname}
                </p>
              )}
            </div>
          )
        })}
      </ul>
      {/* <Link
        to={`/timetable/payment/${chosenLessonId}`}
        style={{ textDecoration: "none" }}
      > */}
      <button
        className={styles.chooseButton}
        onClick={chooseLesson}
        disabled={
          !selectedLessonId ||
          filteredLessons.find(lesson => lesson._id === selectedLessonId)
            ?.student
        }
      >
        Cansel lesson
      </button>
      {/* </Link> */}
    </div>
  )
}

export default LessonsList
