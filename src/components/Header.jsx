import React from "react";
import { useTranslation } from "react-i18next"; // Import the correct hook from i18n
import Menu from "../assets/menu.png";

const Header = ({ currentStep, handleStepChange }) => {
  const { t } = useTranslation();
  return (
    <div className="header">
      <div className="logo">
        <h1
          className="text-logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          CardVerify
        </h1>
        {/* <sub className="logo-sub">{t("Your balance buddy")}</sub> */}
      </div>
      <div className="menu">
        <button
          className="menu-btn"
          onClick={() => {
            handleStepChange("Contact");
            setTimeout(() => {
              window.location.href = "#form";
            }, 2);
          }}
        >
          {t("Contact us")} {/* Use the i18n translation function */}
        </button>
      </div>
    </div>
  );
};

export default Header;
