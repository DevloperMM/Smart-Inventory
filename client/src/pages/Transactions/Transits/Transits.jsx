import TransitsList from "./TransitsList.jsx";
import { useState } from "react";
import TransferOptions from "./TransferOptions.jsx";

function Transits() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <TransitsList setStep={setStep} />}
      {step === 2 && <TransferOptions />}
    </>
  );
}

export default Transits;
