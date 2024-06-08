// import Navbar from "../../components/navbar/Navbar"
// import User from "../../components/profile/Profile"\
import styles from "./profileEmail.module.scss"
import { AuthContext } from "../../../context/authContext"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import useFetch from "../../../hooks/useFetch"

const ProfileEmail = () => {
  const { user } = useContext(AuthContext)
  const { t } = useTranslation()
  const { data, patchData, getData } = useFetch()

  const handleEditClick = async () => {
    try {
      let res = await patchData(`http://localhost:3000/api/auth/verify/resend`)
      console.log(res)
    } catch (err) {
      console.log(err)
    } // Дополнительные действия при нажатии на кнопку редактирования
  }
  return (
    <div className={styles.profileEmailContainer}>
      <h1> {t("profile.header", { ns: "pages" })}</h1>
      {user.emailVerificationStatus == "pending" && (
        <div>
          <p>{t("emailConfirmation.error", { ns: "pages" })}</p>
          <button className={styles.sendButton} onClick={handleEditClick}>
            {t("profile.btn_sendButton", { ns: "pages" })}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileEmail
