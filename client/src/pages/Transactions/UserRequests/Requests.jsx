import React, { useState } from "react";
import { IssueOptions, RequestsList } from "../../../components";

function Requests() {
  const [step, setStep] = useState(2);

  return (
    <>
      {step === 1 && <RequestsList />}
      {step === 2 && <IssueOptions />}
    </>
  );
}

export default Requests;
