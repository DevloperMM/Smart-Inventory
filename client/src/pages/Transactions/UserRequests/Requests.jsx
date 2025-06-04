import { useState } from "react";
import RequestsList from "./RequestsList.jsx";
import IssueOptions from "./IssueOptions.jsx";

function Requests() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <RequestsList setStep={setStep} />}
      {step === 2 && <IssueOptions />}
    </>
  );
}

export default Requests;
