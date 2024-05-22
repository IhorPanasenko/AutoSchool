import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { warehouseInputs } from "../../formSource"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import axios from "axios"

const Single = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [files, setFiles] = useState("")

  const { data, loading, error } = useFetch(`/warehouses/find/${id}`)
  let [info, setInfo] = useState({})

  const handleChange = (e) => {
    info = Object.assign({}, data)

    let updatedInfo = {}

    if (e.target.id.startsWith("ukr.")) {
      const idWithoutPrefix = e.target.id.substr(4)

      updatedInfo = {
        ...info,
        ukr: {
          ...info.ukr,
          [idWithoutPrefix]: e.target.value,
        },
      }
    } else if (e.target.id.startsWith("en.")) {
      const idWithoutPrefix = e.target.id.substr(3)
      updatedInfo = {
        ...info,
        en: {
          ...info.en,
          [idWithoutPrefix]: e.target.value,
        },
      }
    } else {
      updatedInfo = {
        ...info,
        [e.target.id]: e.target.value,
      }
    }

    setInfo(updatedInfo)
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

      const res = await axios.put(`/warehouses/${id}`, newhotel)
      console.log(res.status)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            {data.length == 0 ? (
              "loading"
            ) : (
              <>
                <div className="item">
                  <form>
                    <div className="formInput">
                      <label htmlFor="file">Image:</label>
                      <DriveFolderUploadOutlinedIcon className="icon" />

                      <input
                        type="file"
                        id="file"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                        style={{ display: "none" }}
                      />
                    </div>

                    {warehouseInputs.map((input) => {
                      let value
                      let fieldInput
                      if (input.id.includes(".")) {
                        const [language, field] = input.id.split(".")
                        value = data[language][field]
                        fieldInput = field
                      } else {
                        value = data[input.id]
                      }
                      return (
                        <div className="formInput" key={input.id}>
                          <label>{input.label}</label>
                          {fieldInput !== "description" ? (
                            <input
                              id={input.id}
                              defaultValue={value}
                              onChange={handleChange}
                              type={input.type}
                              placeholder={input.placeholder}
                            />
                          ) : (
                            <textarea
                              id={input.id}
                              defaultValue={value}
                              onChange={handleChange}
                              type={input.type}
                              placeholder={input.placeholder}
                            />
                          )}
                        </div>
                      )
                    })}
                    <div className="formInput select">
                      <div>
                        <label className="formSelect">Electricity</label>
                        <select
                          id="electricity"
                          onChange={handleChange}
                          defaultValue={data.electricity}
                        >
                          <option value={false}>No</option>
                          <option value={true}>Yes</option>
                        </select>
                      </div>
                      <div>
                        <label>Plumbing</label>
                        <select
                          id="plumbing"
                          onChange={handleChange}
                          defaultValue={data.plumbing}
                        >
                          <option value={false}>No</option>
                          <option value={true}>Yes</option>
                        </select>
                      </div>
                      <div>
                        <label>Protection</label>
                        <select
                          id="protection"
                          onChange={handleChange}
                          defaultValue={data.protection}
                        >
                          <option value={false}>No</option>
                          <option value={true}>Yes</option>
                        </select>
                      </div>
                    </div>

                    <button className="update" onClick={handleClick}>
                      Update
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single
