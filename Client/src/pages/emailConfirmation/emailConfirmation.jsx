import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import styles from "./emailConfirmation.module.scss";

const EMAIL_CONFIRMATION_URL = "http://localhost:3000/api/auth/verify/users/";

function EmailConfirmation() {
  const { userId } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const token = new URLSearchParams(location.search).get("token");
  const [confirmationStatus, setConfirmationStatus] = useState("Processing");
  const [confirmationStarted, setConfirmationStareted] = useState(false);

  const handleVerifyEmail = async () => {
    setConfirmationStareted(true);

    try {
      await axios.get(`${EMAIL_CONFIRMATION_URL}${userId}?token=${token}`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setConfirmationStatus("Confirmed");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      console.error("Error confirming email:", error);
      setConfirmationStatus("Error");
    }
  };

  return (
    <div className={styles.container}>
      <h1>{t("emailConfirmation.title")}</h1>
      {confirmationStatus === "Processing" && (
        <div className={styles.box}>
          {confirmationStarted ? (
            <>
              <p>{t("emailConfirmation.confirming")}</p>
              <div className={styles.loader_wrapper}>
                <ClipLoader size={35} color={"#123abc"} loading={true} />
              </div>
            </>
          ) : (
            <button className={styles.verifyButton} onClick={handleVerifyEmail}>
              {t("emailConfirmation.verifyEmailButton")}
            </button>
          )}
        </div>
      )}
      {confirmationStatus === "Confirmed" && (
        <div className={styles.box}>
          <p>{t("emailConfirmation.redirecting")}</p>
        </div>
      )}
      {confirmationStatus === "Error" && (
        <div className={styles.box}>
          <p>{t("emailConfirmation.error")}</p>
        </div>
      )}
    </div>
  );
}

export default EmailConfirmation;
