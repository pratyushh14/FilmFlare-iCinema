import React from "react";
import { Spinner } from "react-bootstrap";

import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      className="Loader"
      style={{
        height: "300px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Oval
        visible={true}
        height="80"
        width="80"
        color="white"
        ariaLabel="oval-loading"
        secondaryColor="black"
      />
    </div>
  );
};

export default Loader;
