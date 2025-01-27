import React from "react";
import CardNumPin from "./CardNumPin";
import CardType from "./CardType";
import CodeCard from "./CodeCard";
import Neutral from "./Neutral";
import PrepaidCard from "./PrepaidCard";
import Result from "./Result";
import NoResult from "./NoResult";
import Loading from "./Loading";
import Contact from "./Contact";
import { useTranslation } from "react-i18next"; // Import the correct hook from i18n

const Right = ({ currentStep, handleStepChange }) => {
  const { t } = useTranslation();
  const changeStep = (step) => {
    handleStepChange(step);
  };

  // handleStepChange("Result");

  return (
    <div className="right-content">
      {currentStep === "Neutral" && <Neutral />}
      {currentStep === "CardType" && <CardType currentStep={changeStep} />}
      {currentStep === "CodeCard" && <CodeCard currentStep={changeStep} />}
      {currentStep === "PinCard" && <CardNumPin currentStep={changeStep} />}
      {currentStep === "PrepaidCard" && (
        <PrepaidCard currentStep={changeStep} />
      )}
      {currentStep === "Result" && <Result currentStep={changeStep} />}
      {currentStep === "No" && <NoResult currentStep={changeStep} />}
      {currentStep === "Loading" && <Loading currentStep={changeStep} />}
      {currentStep === "Contact" && <Contact currentStep={changeStep} />}
      <div className="n-footer mobile">
        ©2025 CardVerify <sub>{t("Your balance buddy")}</sub>
      </div>
    </div>
  );
};

export default Right;
