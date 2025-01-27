import React from "react";
import { useTranslation } from "react-i18next"; // Import the correct hook from i18n
import img from "../assets/2.jpg";

const Left = ({ handleStepChange }) => {
  const { t } = useTranslation();

  const changeStep = () => {
    handleStepChange("CardType");
  };

  return (
    <div className="left">
      <div className="left-top">
        <h2>
          {t("Check Your Gift Card or Prepaid Card Balance Instantly!")}
        </h2>
        <p>
          {t(
            "Quick, secure, and easy-to-use tool for verifying card balances and validity"
          )}
        </p>
        <div className="text-group">
          <h3>{t("Your Data is Protected")}</h3>
          <p>
            {t(
              "With advanced encryption and strict privacy policies, your information stays safe."
            )}
          </p>
        </div>

        <div className="text-group">
          <h3 className="left-start">{t("Start Now")}</h3>
          <p>
            {t(
              "Enter your card details and get results in seconds—hassle-free!"
            )}
          </p>
        </div>

        <sub>{t("Manage your cards with confidence and ease.")}</sub>
      </div>
      <div className="bottom-half">
        <div className="cctop">
          <h1 className="ccname">{t("Check Your Card Balance")}</h1>
        </div>
        <button
          className="continue"
          id="start"
          onClick={() => {
            changeStep();
            setTimeout(() => {
              window.location.href = "#form";
            }, 2);
          }}
        >
          {t("Start")}
        </button>
      </div>
      <div className="n-footer web">
        ©2025 CardVerify <sub>{t("Your balance buddy")}</sub>
      </div>
    </div>
  );
};

export default Left;
