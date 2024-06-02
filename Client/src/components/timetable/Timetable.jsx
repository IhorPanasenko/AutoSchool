import React, { useState, useEffect } from "react"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import useFetch from "../../hooks/useFetch"
import styles from "./timetable.module.scss"
import LessonsList from "./lessons/Lessons"

const TimetableUser = () => {
  const today = dayjs() // Get current date
  const [selectedDate, setSelectedDate] = useState(null)
  const [instructorId, setInstructorId] = useState(null)
  const [lessons, setLessons] = useState([])
  const [studentData, setStudentData] = useState([])

  const { data, error: studentError, getData } = useFetch()
  // "http://localhost:3000/api/students/me"

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

  // const { data: lessonsData, error: lessonsError } = useFetch()
  // instructorId
  //   ? `http://localhost:3000/api/instructors/${instructorId}/lessons`
  //   : null
  // console.log(lessonsData)

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

  // useEffect(() => {
  //   if (studentData && studentData.data && studentData.data.student) {
  //     setInstructorId(studentData.data.student.instructorId)
  //     console.log("studentDataaa", studentData.data.student.instructorId)
  //   }
  // }, [studentData])

  // useEffect(() => {
  //   if (lessonsData) {
  //     setLessons(lessonsData.data)
  //     console.log("Lessons :", lessonsData)

  //     console.log("Lessons data:", lessonsData.data)
  //   }
  // }, [lessonsData])

  const handleDateChange = newDate => {
    // Check if the new date is today or after
    // if (newDate.isSame(today, "day") || newDate.isAfter(today, "day")) {
    //   setSelectedDate(newDate)
    // } else {
    //   console.log("Please select today's date or a date after today")
    // }

    setSelectedDate(newDate)
  }

  const filteredLessons = selectedDate
    ? lessons.filter(lesson => dayjs(lesson.date).isSame(selectedDate, "day"))
    : []

  if (studentError) {
    return <div>Error loading student data: {studentError.message}</div>
  }

  // if (lessonsError) {
  //   return <div>Error loading lessons: {lessonsError.message}</div>
  // }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarLocalizationProvider}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            //   minDate={dayjs()}
            renderDay={(day, _, DayProps) => (
              <div
                {...DayProps}
                // style={{
                //   backgroundColor: "lightblue",
                //   borderRadius: "50%",
                //   padding: "10px",
                //   margin: "2px",
                //   textAlign: "center"
                // }}
              >
                {day.format("DD")}
              </div>
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
          // <ul>
          //   {filteredLessons.map(lesson => (
          //     <li
          //       key={lesson._id}
          //       style={{ color: lesson.student ? "red" : "black" }}
          //     >
          //       {lesson.name} - {dayjs(lesson.date).format("MMMM D, YYYY")} -{" "}
          //       {lesson.fromHour} - {lesson.toHour}
          //     </li>
          //   ))}
          // </ul>
        )}
      </div>
    </div>
  )
}

export default TimetableUser
