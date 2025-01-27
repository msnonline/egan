import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Left from "./components/Left";
import Right from "./components/Right";
import TitleUpdater from "./components/TitleUpdater";

function App() {
  const [currentStep, setCurrentStep] = useState(null);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="layout">
      <TitleUpdater />
      <Header currentStep={currentStep} handleStepChange={handleStepChange} />
      <div className="Content">
        <Left handleStepChange={handleStepChange} />
        <Right currentStep={currentStep} handleStepChange={handleStepChange} />
      </div>
    </div>
  );
}

export default App;
