// import Featured from "../../components/featured/Featured"
// import Footer from "../../components/footer/Footer"
// import Header from "../../components/header/Header"
// import MailList from "../../components/mailList/MailList"
import Navbar from "../../components/navbar/Navbar"
import Back from "../../assets/mobile.avif"
import Back2 from "../../assets/back.png"

import styles from "./home.module.scss"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* <Header /> */}
      {/* <div className="homeContainer">
        <Featured />
        <MailList />
        <Footer />
      </div> */}
      {/* <h1>Main</h1> */}
      {/* <img src={Back} alt="Back" className={styles.car_back} /> */}
      <div className={styles.wrapper}>
        <div className={styles.main_text_section}>
          <h1 className={styles.main_text}>Курси водіння</h1>
          <h3 className={styles.regular_text}>
            Реалізуйте свою мрію бути водієм
          </h3>
          <h3 className={styles.regular_text}>
            Навчіться впевнено керувати автомоюілем
          </h3>
          <h3 className={styles.regular_text}>
            Індивідуальний підхід до кожного студента
          </h3>
          <Link
            to="/registration"
            style={{ textDecoration: "none" }}
            className={styles.link_btn_register}
          >
            <button className={styles.btn_register}>Записатися на курси</button>
          </Link>
        </div>
        <div className={styles.back_container}>
          <img src={Back2} alt="Back" className={styles.car_back} />
        </div>
      </div>
    </div>
  )
}

export default Home
