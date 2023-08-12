import React, { Component } from 'react';
import Quiz from './Quiz';

class DemoQuizButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizStarted: false,
    };
  }

  startQuiz = () => {
    this.setState({ quizStarted: true });
  };

  render() {
    return (
      <div>
        {this.state.quizStarted ? (
          <Quiz />
        ) : (
          <button onClick={this.startQuiz}>Take Demo Quiz</button>
        )}
      </div>
    );
  }
}

export default DemoQuizButton;