import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const TitleUpdater = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Dynamically update the title when the language changes
    document.title = t("TrueCard | Your balance buddy");
  }, [t]); // Dependency on the translation function, so title updates when language changes

  return null; // This component doesn't render anything, just updates the title
};

export default TitleUpdater;
