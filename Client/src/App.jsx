import { useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Instructors from "./pages/instructors/Instructors"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"

function App() {
  return (
    <Routes>
      {/* <h1>Vite + React</h1> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/instructors" element={<Instructors />} />

      {/* <Route path="/warehouses" element={<List />} />
        <Route path="/warehouses/:id" element={<Warehouse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
    </Routes>
  )
}

export default App
