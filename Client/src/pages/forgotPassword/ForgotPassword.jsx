import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import styles from "./forgotPassword.module.scss";

const FORGOT_PASSWORD_URL = "http://localhost:3000/api/auth/forgotPassword";

function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateEmail(email)) {
      setError(t("forgotPassword.invalidEmail"));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(FORGOT_PASSWORD_URL, { email });
      setLoading(false);
      if (response.status === 200) {
        setSuccess(t("forgotPassword.successMessage"));
      } else {
        setError(t("forgotPassword.errorMessage"));
      }
    } catch (error) {
      setLoading(false);
      setError(t("forgotPassword.errorMessage"));
    }
  };

  return (
    <div className={styles.container}>
      <h1>{t("forgotPassword.title")}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.emailLabel} htmlFor="email">{t("forgotPassword.emailLabel")}</label>
        <input
          type="email"
          id="email"
          placeholder={t("forgotPassword.emailLabel")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <ClipLoader size={20} color={"#fff"} /> : t("forgotPassword.submitButton")}
        </button>
        {success && <p className={styles.success}>{success}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
