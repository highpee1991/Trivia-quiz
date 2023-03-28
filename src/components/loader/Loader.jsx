import React from "react";
import { Circles } from "react-loader-spinner";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
