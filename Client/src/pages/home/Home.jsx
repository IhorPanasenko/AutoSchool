import Navbar from "../../components/navbar/Navbar"
import Back2 from "../../assets/back.png"

import styles from "./home.module.scss"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t, i18n } = useTranslation()
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.main_text_section}>
          <h1 className={styles.main_text}>
            {t("home.title", { ns: "pages" })}
          </h1>
          <h3 className={styles.regular_text}>
            {t("home.regular_text1", { ns: "pages" })}
          </h3>
          <h3 className={styles.regular_text}>
            {t("home.regular_text2", { ns: "pages" })}
          </h3>
          <h3 className={styles.regular_text}>
            {t("home.regular_text3", { ns: "pages" })}
          </h3>
          <Link
            to="/registration"
            style={{ textDecoration: "none" }}
            className={styles.link_btn_register}
          >
            <button className={styles.btn_register}>
              {t("home.btn_register", { ns: "pages" })}
            </button>
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
