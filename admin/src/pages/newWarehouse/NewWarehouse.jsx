import "./newWarehouse.scss"
import Sidebar from "../../components/sidebar/Sidebar"

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import { warehouseInputs } from "../../formSource"
import axios from "axios"

const NewWarehouse = () => {
  const [files, setFiles] = useState("")
  const [info, setInfo] = useState({})

  const handleChange = (e) => {
    console.log(e.target.id)
    if (e.target.id.startsWith("ukr.")) {
      const idWithoutPrefix = e.target.id.substr(4)

      setInfo((prev) => ({
        ...prev,
        ukr: {
          ...prev.ukr,
          [idWithoutPrefix]: e.target.value,
        },
      }))
    } else if (e.target.id.startsWith("en.")) {
      const idWithoutPrefix = e.target.id.substr(3)

      setInfo((prev) => ({
        ...prev,
        en: {
          ...prev.en,
          [idWithoutPrefix]: e.target.value,
        },
      }))
    } else {
      setInfo((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }))
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData()
          data.append("file", file)
          data.append("upload_preset", "upload")
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dejuuxpwa/image/upload",
            data
          )

          const { url } = uploadRes.data
          return url
        })
      )

      const newhotel = {
        ...info,

        photos: list,
      }

      await axios.post("/warehouses", newhotel)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {warehouseInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput select">
                <div>
                  <label className="formSelect">Electricity</label>
                  <select id="electricity" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div>
                  <label>Plumbing</label>
                  <select id="plumbing" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div>
                  <label>Protection</label>
                  <select id="protection" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewWarehouse
