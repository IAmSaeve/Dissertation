import React from "react";

const Spinner = ({ SpinnerActive }) => {
  const ShowHideSpinner = SpinnerActive ? "lds-spinner" : "hidden";
  const ShowHideOverlay = SpinnerActive ? "modal" : "hidden";
  return (
    <div className={ShowHideOverlay}>
      <div className={ShowHideSpinner}>
        <div></div><div></div>
        <div></div><div></div>
        <div></div><div></div>
        <div></div><div></div>
        <div></div><div></div>
        <div></div><div></div>
      </div>
    </div>
  );
};

export default Spinner;
