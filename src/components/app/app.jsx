import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import {Welcome} from "../welcome/welcome.jsx";


export class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {errorsCount} = this.props;

    return (
      <Welcome
        errorsCount={errorsCount}
        onWelcomeButtonClick={this._handleWelcomeButtonClick}
      />
    );
  }

  _handleWelcomeButtonClick() {}
}


App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
