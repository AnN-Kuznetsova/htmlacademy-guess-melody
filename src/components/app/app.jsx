import PropTypes from "prop-types";
import React from "react";
import {WelcomeScreen} from "../welcome-screen/welcome-screen.jsx";


export const App = (props) => {
  const {errorCount} = props;

  return (
    <WelcomeScreen errorCount={errorCount} />
  );
};


App.propTypes = {
  errorCount: PropTypes.number.isRequired,
};
