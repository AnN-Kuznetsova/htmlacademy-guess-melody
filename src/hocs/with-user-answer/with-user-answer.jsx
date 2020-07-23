import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {GenreQuestionsPropType} from "../../types.js";


export const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false),
      };

      this.handleAnswer = this.handleAnswer.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {question} = this.props;

      if (prevProps.question !== question) {
        this.setState({
          answers: new Array(question.answers.length).fill(false),
        });
      }
    }

    handleAnswer() {
      const {question, onAnswer} = this.props;
      const {answers} = this.state;

      onAnswer(question, answers);
    }

    handleChange(index, value) {
      this.setState((prevState) => {
        const userAnswers = prevState.answers.slice();
        userAnswers[index] = value;
        return {
          answers: userAnswers,
        };
      });
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={answers}
          onAnswer={this.handleAnswer}
          onChange={this.handleChange}
        />
      );
    }
  }


  WithUserAnswer.propTypes = {
    question: GenreQuestionsPropType.isRequired,
    onAnswer: PropTypes.func.isRequired,
  };


  return WithUserAnswer;
};
