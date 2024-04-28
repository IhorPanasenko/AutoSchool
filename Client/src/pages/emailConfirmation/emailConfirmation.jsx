import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import styles from "./emailConfirmation.module.scss";

const EMAIL_CONFIRMATION_URL = "http://localhost:3000/api/auth/verify/users/";

function EmailConfirmation() {
  const { userId } = useParams();
  const { t, i18n } = useTranslation();
  const token = new URLSearchParams(location.search).get("token");
  const [confirmationStatus, setConfirmationStatus] = useState("Processing");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        var res = await axios.get(
          `${EMAIL_CONFIRMATION_URL}${userId}?token=${token}`
        );

        setConfirmationStatus("Confirmed");
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      } catch (error) {
        console.error("Error confirming email:", error);
        setConfirmationStatus("Error");
      }
    };

    console.log(`${EMAIL_CONFIRMATION_URL}${userId}?token=${token}`);
    confirmEmail();
  }, []);

  return (
    <div className={styles.container}>
      <h1>{t("emailConfirmation.title")}</h1>
      {confirmationStatus === "Processing" && (
        <div className={styles.box}>
          <p>{t("emailConfirmation.confirming")}</p>
          <div className={styles.loader_wrapper}>
            <ClipLoader size={35} color={"#123abc"} loading={true} />
          </div>
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
