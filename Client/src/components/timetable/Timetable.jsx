import React, { useState, useEffect } from "react"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import useFetch from "../../hooks/useFetch"
import styles from "./timetable.module.scss"
import { useTranslation } from "react-i18next"
import LessonsList from "./lessons/Lessons"

const TimetableUser = () => {
  const today = dayjs() // Get current date
  const [selectedDate, setSelectedDate] = useState(null)
  const [instructorId, setInstructorId] = useState(null)
  const [lessons, setLessons] = useState([])
  const [studentData, setStudentData] = useState([])
  const { t } = useTranslation()
  const { data, error: studentError, getData } = useFetch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("http://localhost:3000/api/students/me")
        console.log(res)
        // console.log(studentData)
        setStudentData(res)
        console.log("instructorId", res.data.student.instructorId)
        setInstructorId(res.data.student.instructorId)
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
          // console.log("lessonsData", studentData)
        } catch (err) {
          console.error("Failed to fetch lessons my", err)
        }
      }
      fetchData()
    }
  }, [instructorId])

  const shouldDisableDate = date => {
    return date.isBefore(today, "day")
  }

  const handleDateChange = newDate => {
    // Check if the new date is today or after
    if (newDate.isSame(today, "day") || newDate.isAfter(today, "day")) {
      setSelectedDate(newDate)
    } else {
      console.log("Please select today's date or a date after today")
    }

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
            shouldDisableDate={shouldDisableDate}
            renderDay={(day, _, DayProps) => (
              <div {...DayProps}>{day.format("DD")}</div>
            )}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.lessons}>
        <h2>{t("lessons.h2", { ns: "pages" })}</h2>
        {filteredLessons.length === 0 ? (
          <p>{t("lessons.err", { ns: "pages" })}</p>
        ) : (
          <LessonsList filteredLessons={filteredLessons} />
        )}
      </div>
    </div>
  )
}

export default TimetableUser
