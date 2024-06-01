import Sidebar from "../../components/sidebar/Sidebar"

import "./home.scss"

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <h1>welcome to admin page</h1>
      </div>
    </div>
  )
}

export default Home
