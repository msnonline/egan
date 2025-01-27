import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const PrepaidCard = ({ currentStep }) => {
  const { t } = useTranslation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });

  const changeStep = (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = {
      cardNumber: !cardNumber.trim(),
      expiryDate: !expiryDate.trim(),
      cvv: !cvv.trim(),
    };

    // Check if the fields are filled
    if (Object.values(newErrors).includes(true)) {
      formValid = false;
    }

    // If any field is invalid, apply error state
    setErrors(newErrors);

    const storedEntries =
      JSON.parse(localStorage.getItem("GiftCardEntries")) || {};

    // Update the entries with the new input field values
    const updatedEntries = {
      ...storedEntries,
      "Card Number": cardNumber,
      Exp: expiryDate,
      Cvv: cvv,
    };

    // Save updated entries back to localStorage
    localStorage.setItem("GiftCardEntries", JSON.stringify(updatedEntries));

    if (formValid) {
      currentStep("Loading");
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value;

    // Remove all non-numeric characters except the slash
    value = value.replace(/[^0-9/]/g, "");

    // If the value is 2 digits for month, add the slash automatically
    if (value.length === 2 && !value.includes("/")) {
      value = value + "/";
    }

    // Restrict to max length of 5 (mm/yy)
    if (value.length > 5) {
      return; // Stop if more than 5 characters are entered
    }

    setExpiryDate(value);
  };

  // Handle backspace event for expiryDate only when it's focused
  useEffect(() => {
    const handleBackspace = (e) => {
      if (
        e.key === "Backspace" &&
        document.activeElement.id === "exp" && // Ensure the focused input is expiryDate
        expiryDate.length > 0
      ) {
        setExpiryDate((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleBackspace);

    return () => {
      window.removeEventListener("keydown", handleBackspace);
    };
  }, [expiryDate]);

  return (
    <div className="form" onSubmit={changeStep}>
      <div className="form-container">
        <div className="ft-box">
          <h1 className="form-title">{t("Check your card")}</h1>
        </div>
        <div className="card-image"></div>
        <form onSubmit={changeStep}>
          <div className="form-group">
            <label htmlFor="card_number">{t("Card Number")}</label>
            <input
              type="number"
              className={`card-field ${errors.cardNumber ? "error" : ""}`}
              id="card_number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <br />
          <div className="exp-cvv">
            <div className="form-group">
              <label htmlFor="exp">{t("Expiry Date")}</label>
              <input
                type="text"
                className={`card-field exp ${errors.expiryDate ? "error" : ""}`}
                id="exp"
                value={expiryDate}
                onChange={handleExpiryChange}
                maxLength="5" // Ensure max length is 5 (mm/yy)
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">{t("CVV")}</label>
              <input
                type="number"
                className={`card-field cvv ${errors.cvv ? "error" : ""}`}
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
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

export default PrepaidCard;
