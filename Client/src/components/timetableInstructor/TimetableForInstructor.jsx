import React, { useState, useEffect, useContext } from "react"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import useFetch from "../../hooks/useFetch"
import styles from "./timetable.module.scss"
import LessonsList from "./lessonsinstructor/LessonsInstructor"
import { AuthContext } from "../../context/authContext"

const TimetableForInstructor = () => {
  const today = dayjs() // Get current date
  const [selectedDate, setSelectedDate] = useState(null)
  const [instructorId, setInstructorId] = useState(null)
  const [lessons, setLessons] = useState([])
  const [studentData, setStudentData] = useState([])

  const { data, error: studentError, getData } = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("http://localhost:3000/api/instructors/me")
        console.log(res)

        setStudentData(res)
        console.log("instructorId", res.data._id)
        setInstructorId(res.data._id)
      } catch (err) {
        console.error("Failed to fetch lessons my", err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (instructorId) {
      const fetchData = async () => {
        try {
          const result = await getData(
            `http://localhost:3000/api/instructors/${instructorId}/lessons`
          )
          console.log("result lessonsData", result)
          setLessons(result.data)
        } catch (err) {
          console.error("Failed to fetch lessons my", err)
        }
      }
      fetchData()
    }
  }, [instructorId])

  const handleDateChange = newDate => {
    setSelectedDate(newDate)
  }

  const filteredLessons = selectedDate
    ? lessons.filter(lesson => dayjs(lesson.date).isSame(selectedDate, "day"))
    : []

  if (studentError) {
    return <div>Error loading student data: {studentError.message}</div>
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarLocalizationProvider}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            renderDay={(day, _, DayProps) => (
              <div {...DayProps}>{day.format("DD")}</div>
            )}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.lessons}>
        <h2>Choose lesson to book</h2>
        {filteredLessons.length === 0 ? (
          <p>No lessons available</p>
        ) : (
          <LessonsList filteredLessons={filteredLessons} />
        )}
      </div>
    </div>
  )
}

export default TimetableForInstructor
