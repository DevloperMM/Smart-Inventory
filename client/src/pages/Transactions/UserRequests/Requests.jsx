import React, { useState } from "react";
import {
  RequestsList,
  AssetOptions,
  ConsumableOptions,
} from "../../../components";

function Requests() {
  const [step, setStep] = useState(1);
  const [isAssetActive, setIsAssetActive] = useState(true);

  return (
    <>
      {step === 1 && <RequestsList />}
      {step === 2 && (isAssetActive ? <AssetOptions /> : <ConsumableOptions />)}
    </>
  );
}

export default Requests;
