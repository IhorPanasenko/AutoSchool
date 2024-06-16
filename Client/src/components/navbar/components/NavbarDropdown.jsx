import { useState } from "react"
import styles from "./navbarDropdown.module.scss"

import Path from "../../../assets/Path.svg"

const NavBarDropdown = ({ title, items, defaultClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdownHandler = () => {
    setIsDropdownOpen(prev => !prev)
  }

  const closeDropdownHandler = () => {
    setIsDropdownOpen(true)
  }

  const checkIfCloseHandler = e => {
    const { relatedTarget } = e
    if (
      !relatedTarget.closest(".menu__dropdown") &&
      !relatedTarget.closest(".menu__dropdown-helper")
    )
      setIsDropdownOpen(false)
  }

  return (
    <li className={styles.menu__item} onClick={toggleDropdownHandler}>
      <div
        style={{ display: isDropdownOpen ? "block" : "none" }}
        className={styles.menu__dropdown_helper}
        onMouseLeave={checkIfCloseHandler}
      ></div>
      <span className={styles.menu__projects}>{title}</span>
      <img
        src={Path}
        alt="Menu Icon"
        className={`${styles.menu__icon} ${
          isDropdownOpen ? styles.show : styles.hide
        }`}
      />
      <ul
        className={`${styles.dropdown_content} ${
          isDropdownOpen ? styles.show : styles.hide
        }`}
        onMouseLeave={checkIfCloseHandler}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className={styles.menu__dropdown}
            onClick={e => {
              closeDropdownHandler()
              item.onClick && item.onClick(e)
              defaultClick(e)
            }}
          >
            <span className={styles.menu__dropdown_item}>{item.title}</span>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default NavBarDropdown
