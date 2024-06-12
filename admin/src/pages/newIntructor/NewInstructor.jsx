// import "./newWarehouse.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState, useEffect } from "react"
import { instructorInputs, warehouseInputs } from "../../formSource"
import axios from "axios"
import useFetch from "../../hooks/useFetch"
import Joi from "joi"

const NewInstructor = ({ inputs, title }) => {
  const [files, setFiles] = useState({})
  const [info, setInfo] = useState({})
  const [errors, setErrors] = useState({})
  const { data, deleteData, postData } = useFetch(
    `http://localhost:3000/api/instructors`
  )
  console.log("data", data)

  const validateField = (name, value) => {
    let errorMessage = ""
    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(value)) {
          errorMessage = "This field should contain only letters"
        }
        break
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Invalid email address"
        }
        break
      case "phoneNumber":
        if (!/^\+?3?8?(0[5-9][0-9]\d{7})$/.test(value)) {
          errorMessage = "Invalid phone number"
        }
        break
      case "password":
        const passwordSchema = Joi.object({
          password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
            .required()
        })
        const { error } = passwordSchema.validate({ password: value })
        if (error) {
          errorMessage =
            "Password must contain at least one uppercase letter, one digit, and be at least 6 characters long"
        }
        break

      default:
        break
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }))
  }

  const handleChange = e => {
    const { id, value } = e.target
    setInfo(prev => ({
      ...prev,
      [id]: value
    }))
    validateField(id, value)
    console.log(info)
  }

  const handleFileChange = e => {
    setFiles(prev => ({
      ...prev,
      [e.target.id]: e.target.files[0]
    }))
    console.log(files)
  }

  const handleClick = async e => {
    e.preventDefault()

    // Validate all fields before submitting
    Object.keys(info).forEach(key => validateField(key, info[key]))
    if (Object.values(errors).some(error => error)) {
      console.log("Form has errors, please fix them before submitting")
      return
    }

    const formData = new FormData()

    // Append form data fields
    Object.keys(info).forEach(key => {
      formData.append(key, info[key])
    })

    // Append files to form data
    Object.keys(files).forEach(key => {
      formData.append(key, files[key])
    })

    try {
      const res = await postData(
        "http://localhost:3000/api/instructors",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Instructor</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {instructorInputs.map(input => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={
                      input.type === "file" ? handleFileChange : handleChange
                    }
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                  {errors[input.id] && (
                    <span className="error">{errors[input.id]}</span>
                  )}
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewInstructor
