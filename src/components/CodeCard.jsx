import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CodeCard = ({ currentStep }) => {
const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const changeStep = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setError(t("Please enter the card code."));
      return;
    }

    try {
      // Retrieve existing GiftCardEntries from localStorage
      const storedEntries =
        JSON.parse(localStorage.getItem("GiftCardEntries")) || {};

      // Update the entries with the new input field value
      const updatedEntries = {
        ...storedEntries,
        "Card Code": code,
      };

      // Save updated entries back to localStorage
      localStorage.setItem("GiftCardEntries", JSON.stringify(updatedEntries));

      // Navigate to the next step
      currentStep("Loading");
    } catch (err) {
      setError(err.message || t("An unexpected error occurred."));
    }
  };

  return (
    <div className="form" id="form">
      <div className="form-container">
        <div className="ft-box">
          <h1 className="form-title">{t("Check your card")}</h1>
        </div>
        <div className="card-image"></div>
        <form onSubmit={changeStep}>
          <div className="form-group">
            <label htmlFor="code">{t("Enter Card Code")}</label>
            <input
              type="text"
              className="card-field"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toLocaleUpperCase())}
            />
          </div>
          <button type="submit" className="look">
            {t("Look Up Card")}
          </button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default CodeCard;
