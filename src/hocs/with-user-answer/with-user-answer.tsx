import React from "react";
import {Subtract} from "utility-types";

import {GenreQuestionType} from "../../types";


interface Props {
  question: GenreQuestionType;
  onAnswer: (question: GenreQuestionType, answers: Answer) => void;
};

interface State {
  answers: Answer;
};

interface InjectedProps {
  userAnswers: Answer;
  onAnswer: () => void;
  onChange: (index: number) => void;
};

type Answer = boolean[];


export const withUserAnswer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithUserAnswer extends React.PureComponent<T, State> {
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


  return WithUserAnswer;
};
