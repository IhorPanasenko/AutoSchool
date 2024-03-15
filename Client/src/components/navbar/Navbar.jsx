import React, { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import NavBarDropdown from "./components/NavbarDropdown.jsx"
// import "./navbar.css"
import styles from "./navbar.module.scss"
import i18next from "i18next"
// import { AuthContext } from "../../context/AuthContext.js"
import { Link, useLocation } from "react-router-dom"
import Profile from "../../assets/profile.svg"

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  const [nav, setNav] = useState(false)
  const location = useLocation()

  const changeLanguage = (lang, e) => {
    setSelectedLanguage(lang)
    e.preventDefault()
    i18next.changeLanguage(lang)
    setNav(false)
  }
  const language = i18n.language
  var cookies = document.cookie.split(";")
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("="),
      name = parts[0],
      value = parts[1]
  }

  const isActive = path => {
    return location.pathname === path
  }
  console.log("my lang" + document.cookie)
  //   const { user } = useContext(AuthContext)

  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo_container}>
          <span className={styles.logo}>SPAS</span>
          <p className={styles.name}>{t("navbar.name", { ns: "pages" })}</p>
        </div>
        <div className={styles.menu}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p
              className={`${styles.menu_text} ${
                isActive("/") ? styles.active : ""
              }`}
            >
              {t("navbar.linkmain", { ns: "pages" })}
            </p>
          </Link>
          <Link to="/contacts" style={{ textDecoration: "none" }}>
            <p
              className={`${styles.menu_text} ${
                isActive("/contacts") ? styles.active : ""
              }`}
            >
              {t("navbar.linkcontacts", { ns: "pages" })}
            </p>
          </Link>
          <Link to="/instructors" style={{ textDecoration: "none" }}>
            <p
              className={`${styles.menu_text} ${
                isActive("/instructors") ? styles.active : ""
              }`}
            >
              {t("navbar.linkinstructors", { ns: "pages" })}
            </p>
          </Link>
          <Link to="/reviews" style={{ textDecoration: "none" }}>
            <p
              className={`${styles.menu_text} ${
                isActive("/reviews") ? styles.active : ""
              }`}
            >
              {t("navbar.linkreviews", { ns: "pages" })}
            </p>
          </Link>
        </div>
        {/* {user ? (
          user.username
        ) : ( */}
        <div className={styles.btn_container}>
          <div className={styles.navItems}>
            <Link to="/registration" style={{ textDecoration: "none" }}>
              <button className={styles.navButton}>
                {t("navbar.btnreg", { ns: "pages" })}
              </button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className={styles.navButton}>
                {t("navbar.btnlog", { ns: "pages" })}
              </button>
            </Link>
          </div>
          {/* )} */}
          <div className={styles.btn_page_container}>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <img src={Profile} alt="Profile" className={styles.profile_ico} />
            </Link>
          </div>
          <div className={styles.language}>
            <NavBarDropdown
              defaultClick={() => {
                setNav(false)
              }}
              title={selectedLanguage === "en" ? "ENG" : "УКР"}
              items={[
                {
                  title: "Українська",
                  active: selectedLanguage === "ukr",
                  onClick: e => changeLanguage("ukr", e)
                },
                {
                  title: "English",
                  active: selectedLanguage === "en",
                  onClick: e => changeLanguage("en", e)
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
