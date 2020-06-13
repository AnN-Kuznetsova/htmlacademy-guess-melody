import PropTypes from "prop-types";
import React from "react";
import {WelcomeScreen} from "../welcome-screen/welcome-screen.jsx";


const welcomeButtonClickHandler = () => {};


export const App = (props) => {
  const {errorCount} = props;

  return (
    <WelcomeScreen
      errorCount={errorCount}
      welcomeButtonClickHandler={welcomeButtonClickHandler}
    />
  );
};


App.propTypes = {
  errorCount: PropTypes.number.isRequired,
};
