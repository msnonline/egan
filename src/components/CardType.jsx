import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CardType = ({ currentStep }) => {
  const { t } = useTranslation();
  const [cardType, setCardType] = useState("");
  const [choice, setChoice] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardType || !currency || !amount) {
      setError(t("Please select both a card and a currency."));
      return;
    }

    // Save the entries in localStorage
    const entries = {
      "Card Brand": choice,
      Currency: currency,
      Amount: amount,
    };
    localStorage.setItem("GiftCardEntries", JSON.stringify(entries));

    // Navigate to the appropriate step
    switch (cardType.split(":")[0]) {
      case "giftcard":
        currentStep("CodeCard");
        break;
      case "pincard":
        currentStep("PinCard");
        break;
      case "prepaidcard":
        currentStep("PrepaidCard");
        break;
      default:
        currentStep("Neutral");
        break;
    }
  };

  useEffect(() => {
    let card = cardType.split(":")[1];
    setChoice(card);
  }, [cardType]);

  return (
    <div className="form" id="form">
      <div className="form-container">
        <div className="ft-box">
          <h1 className="form-title">{t("Check your card")}</h1>
        </div>
        <div className="card-image"></div>
        <form onSubmit={handleSubmit} className="form-itself">
          <div className="form-group">
            <label htmlFor="card_type">{t("Card Brand")}</label>
            <select
              name="card_type"
              id="card_type"
              className="custom-select"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="">{t("Select Card")}</option>
              <option value="giftcard:Apple Store ">{t("Apple Store ")}</option>
              <option value="giftcard:Steam Wallet ">
                {t("Steam Wallet ")}
              </option>
              <option value="giftcard:Itunes ">{t("Itunes ")}</option>
              <option value="giftcard:Razer Gold ">{t("Razer Gold ")}</option>
              <option value="giftcard:Amazon ">{t("Amazon ")}</option>
              <option value="giftcard:Ebay ">{t("Ebay ")}</option>
              <option value="pincard:Target ">{t("Target ")}</option>
              <option value="pincard:Sephora ">{t("Sephora ")}</option>
              <option value="giftcard:Offgamers.com ">
                {t("Offgamers.com ")}
              </option>
              <option value="giftcard:Eneba ">{t("Eneba ")}</option>
              <option value="giftcard:XBOX ">{t("XBOX ")}</option>
              <option value="giftcard:PlayStation ">{t("PlayStation ")}</option>
              <option value="prepaidcard:Visa ">{t("Visa ")}</option>
              <option value="prepaidcard:Master ">{t("Master ")}</option>
              <option value="prepaidcard:Walmart Visa ">
                {t("Walmart Visa ")}
              </option>
              <option value="prepaidcard:Lululemon ">{t("Lululemon ")}</option>
              <option value="giftcard:Uber ">{t("Uber ")}</option>
              <option value="prepaidcard:Target Visa ">
                {t("Target Visa ")}
              </option>
              <option value="giftcard:Adidas ">{t("Adidas ")}</option>
              <option value="prepaidcard:American Express ">
                {t("American Express ")}
              </option>
              <option value="prepaidcard:OneVanilla VISA/MasterCard ">
                {t("OneVanilla VISA/MasterCard ")}
              </option>
              <option value="pincard:Walmart ">{t("Walmart ")}</option>
            </select>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="currency">{t("Currency")}</label>
            <select
              className="card-field custom-select"
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="">{t("Select Currency")}</option>
              <option value="USD">{t("USD ($)")}</option>
              <option value="CAD">{t("CAD ($)")}</option>
              <option value="AUD">{t("AUD ($)")}</option>
              <option value="GBP">{t("GBP (£)")}</option>
              <option value="EUR">{t("EUR (€)")}</option>
              <option value="AED">{t("AED (د.إ)")}</option>
            </select>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="currency">{t("Amount")}</label>
            <input
              type="number"
              className="card-field"
              id="amount"
              placeholder="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="look">{t("Look Up Card")}</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default CardType;
