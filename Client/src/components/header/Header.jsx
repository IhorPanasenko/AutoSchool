import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./header.css"
import { DateRange } from "react-date-range"
import { useState, useContext } from "react"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { t } from "i18next"

const Header = ({ type }) => {
  const [destination, setDestination] = useState("")
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])

  const navigate = useNavigate()

  const { dispatch } = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates } })
    navigate("/warehouses", { state: { destination, dates } })
  }

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              {t("header.headerTitle", { ns: "pages" })}
            </h1>
            <p className="headerDesc">
              {t("header.headerDesc", { ns: "pages" })}
            </p>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faWarehouse} className="headerIcon" />
                <input
                  type="text"
                  placeholder={t("header.headerSearchInput", { ns: "pages" })}
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  {t("header.headerBtn", { ns: "pages" })}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
