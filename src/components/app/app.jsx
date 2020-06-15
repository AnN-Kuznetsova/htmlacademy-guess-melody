import PropTypes from "prop-types";
import React from "react";
import {Welcome} from "../welcome/welcome.jsx";


const handleWelcomeButtonClick = () => {};


export const App = (props) => {
  const {errorCount} = props;

  return (
    <Welcome
      errorCount={errorCount}
      onWelcomeButtonClick={handleWelcomeButtonClick}
    />
  );
};


App.propTypes = {
  errorCount: PropTypes.number.isRequired,
};
