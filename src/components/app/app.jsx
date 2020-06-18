import PropTypes from "prop-types";
import React from "react";
import {Welcome} from "../welcome/welcome.jsx";


const handleWelcomeButtonClick = () => {};


export const App = (props) => {
  const {errorsCount} = props;

  return (
    <Welcome
      errorsCount={errorsCount}
      onWelcomeButtonClick={handleWelcomeButtonClick}
    />
  );
};


App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
