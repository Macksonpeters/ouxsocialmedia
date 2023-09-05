import React from "react";
import { ImSpinner6 } from "react-icons/im";

const Spinner = ({ spinnerText }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[40vh] bg-inherit">
        <span>
          <ImSpinner6 className="text-3xl xl:text-4xl text-[#F2FC89] animate-spin-slow" />
        </span>
        <p className="pt-3 capitalize">{spinnerText}</p>
      </div>
    </div>
  );
};

export default Spinner;
