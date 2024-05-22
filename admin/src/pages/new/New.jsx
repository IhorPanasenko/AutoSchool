import "./new.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import { useState } from "react"
import axios from "axios"

const New = ({ inputs, title }) => {
  const [info, setInfo] = useState({})

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/auth/register", info)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
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

export default New
