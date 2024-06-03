import { useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Instructors from "./pages/instructors/Instructors"
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Register from "./pages/register/Register"
import EmailConfirmation from "./pages/emailConfirmation/emailConfirmation"
import ForgotPassword from "./pages/forgotPassword/ForgotPassword"
import ResetPassword from "./pages/resetPassword/ResetPassword"
import Timetable from "./pages/timetable/Timetable"
import Payment from "./pages/payment/Payment"

import Lessons from "./pages/lessons/Lessons"
import ProfileInstructor from "./pages/instructorProfile/ProfileInstructor"
import TimetableInstructor from "./pages/timetableInstructors/TimetableInstructors"

function App() {
  return (
    <Routes>
      {/* <h1>Vite + React</h1> */}

      <Route path="/timetable" element={<Timetable />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/instructors" element={<Instructors />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/confirmEmail/:userId" element={<EmailConfirmation />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/timetable/payment/:chosenLessonId" element={<Payment />} />
      <Route path="/mylessons" element={<Lessons />} />
      <Route path="/profile/instructor" element={<ProfileInstructor />} />
      <Route path="/timetable/instructor" element={<TimetableInstructor />} />

      {/* <Route path="/warehouses" element={<List />} />
        <Route path="/warehouses/:id" element={<Warehouse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
    </Routes>
  )
}

export default App
