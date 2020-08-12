import React, { Fragment } from "react";
import spinner from "../Assets/spinning.gif";

function Spinner() {
  return (
    <Fragment>
      <img
        style={{ margin: "200px auto" }}
        src={spinner}
        alt="spinner"
      />
    </Fragment>
  );
}

export default Spinner;
