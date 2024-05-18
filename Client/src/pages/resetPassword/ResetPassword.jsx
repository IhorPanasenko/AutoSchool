import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import styles from "./resetPassword.module.scss";

const RESET_PASSWORD_URL = "http://localhost:3000/api/auth/resetPassword";

function ResetPassword() {
  const { t } = useTranslation();
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== repeatPassword) {
      setError(t("resetPassword.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(`${RESET_PASSWORD_URL}/${token}`, {
        password: newPassword,
      });
      setLoading(false);
      if (response.status === 200) {
        window.location.href = "/login";
      } else {
        setError(t("resetPassword.errorMessage"));
      }
    } catch (error) {
      setLoading(false);
      setError(t("resetPassword.errorMessage"));
    }
  };

  return (
    <div className={styles.container}>
      <h1>{t("resetPassword.title")}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="newPassword">{t("resetPassword.newPasswordLabel")}</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
        />
        <label className={styles.label} htmlFor="repeatPassword">{t("resetPassword.repeatPasswordLabel")}</label>
        <input
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <ClipLoader size={20} color={"#fff"} /> : t("resetPassword.submitButton")}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
