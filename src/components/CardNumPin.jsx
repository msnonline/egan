import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const CardNumPin = ({ currentStep }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation(); // Access the translation function

  const changeStep = async (e) => {
    e.preventDefault();

    if (!cardNumber.trim() || !pin.trim()) {
      setError(t("error.emptyFields")); // Use the translation for error message
      return;
    }

    try {
      // Retrieve existing GiftCardEntries from localStorage
      const storedEntries =
        JSON.parse(localStorage.getItem("GiftCardEntries")) || {};

      // Update the entries with the new input field values
      const updatedEntries = {
        ...storedEntries,
        "Card Number": cardNumber,
        PIN: pin,
      };

      // Save updated entries back to localStorage
      localStorage.setItem("GiftCardEntries", JSON.stringify(updatedEntries));

      // Navigate to the next step
      currentStep("Loading");
    } catch (err) {
      setError(err.message || t("error.invalidInput")); // Use translation for error message
    }
  };

  return (
    <div className="form" id="form">
      <div className="form-container">
        <div className="ft-box">
          <h1 className="form-title">{t("Check your card")}</h1>{" "}
          {/* Translated title */}
        </div>
        <div className="card-image"></div>
        <form onSubmit={changeStep}>
          <div className="form-group">
            <label htmlFor="card_number">{t("Card Number")}</label>{" "}
            {/* Translated label */}
            <input
              type="number"
              className="card-field"
              id="card_number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="pin">{t("Card PIN or Access code")}</label>{" "}
            {/* Translated label */}
            <input
              type="number"
              className="card-field"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <button type="submit" className="look">
            {t("Look Up Card")} {/* Translated button text */}
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

export default CardNumPin;
