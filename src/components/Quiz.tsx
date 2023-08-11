import React, { Component } from 'react';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      score: 0,
      selectedOptions: new Array(10).fill(null),
      timeRemaining: 300, // 5 minutes in seconds
      quizEnded: false,
    };
    this.questions = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            correctOption: 0,
          },
          {
            question: 'What is the largest planet in our solar system?',
            options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
            correctOption: 2,
          },
          {
            question: 'Which famous scientist developed the theory of general relativity?',
            options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'],
            correctOption: 1,
          },
          {
            question: 'What is the chemical symbol for the element gold?',
            options: ['Au', 'Ag', 'Fe', 'Cu'],
            correctOption: 0,
          },
          {
            question: 'What is the largest mammal?',
            options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
            correctOption: 1,
          },
          {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
            correctOption: 1,
          },
          {
            question: 'What gas do plants absorb from the atmosphere during photosynthesis?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
            correctOption: 1,
          },
          {
            question: 'Which element has the chemical symbol "Fe"?',
            options: ['Iron', 'Gold', 'Silver', 'Copper'],
            correctOption: 0,
          },
          {
            question: 'Who wrote the play "Romeo and Juliet"?',
            options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
            correctOption: 0,
          },
          {
            question: 'What is the largest ocean on Earth?',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
            correctOption: 3,
          },
          {
            question: 'Which gas do plants use for photosynthesis?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
            correctOption: 1,
          },
          {
            question: 'What is the chemical symbol for water?',
            options: ['O', 'H2O', 'CO2', 'NaCl'],
            correctOption: 1,
          },
          {
            question: 'What is the smallest prime number?',
            options: ['1', '2', '3', '5'],
            correctOption: 1,
          },
          {
            question: 'What is the largest species of shark?',
            options: ['Great White Shark', 'Hammerhead Shark', 'Whale Shark', 'Tiger Shark'],
            correctOption: 2,
          },
          {
            question: 'Which planet is known as the "Morning Star" or "Evening Star"?',
            options: ['Earth', 'Mars', 'Venus', 'Mercury'],
            correctOption: 2,
          },
          {
            question: 'What is the chemical symbol for the element oxygen?',
            options: ['O', 'O2', 'H2O', 'CO2'],
            correctOption: 0,
          },
          {
            question: 'Which continent is known as the "Dark Continent"?',
            options: ['Africa', 'Europe', 'Asia', 'North America'],
            correctOption: 0,
          },
          {
            question: 'What is the largest land animal?',
            options: ['African Elephant', 'Giraffe', 'Hippopotamus', 'Rhinoceros'],
            correctOption: 0,
          },
          {
            question: 'What is the chemical symbol for the element helium?',
            options: ['He', 'H', 'Ho', 'Hy'],
            correctOption: 0,
          },
          {
            question: 'What is the most abundant gas in Earth\'s atmosphere?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
            correctOption: 2,
          },
          {
            question: 'What does CPU stand for in computer terms?',
            options: ['Central Process Unit', 'Computer Processing Unit', 'Central Processor Unit', 'Central Processing Unit'],
            correctOption: 3,
          },
          {
            question: 'Which programming language is often referred to as the "mother of all languages"?',
            options: ['C', 'Python', 'Java', 'Fortran'],
            correctOption: 0,
          },
          {
            question: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Markup Language', 'Hyper Text Modern Language'],
            correctOption: 0,
          },
          {
            question: 'What is the process of finding and fixing bugs in a program called?',
            options: ['Debugging', 'Error Fixing', 'Code Cleaning', 'Code Optimization'],
            correctOption: 0,
          },
          {
            question: 'Which protocol is used to send email over the Internet?',
            options: ['HTTP', 'FTP', 'SMTP', 'TCP'],
            correctOption: 2,
          },
          {
            question: 'Which programming language is used to build Android apps?',
            options: ['Java', 'Python', 'C++', 'Ruby'],
            correctOption: 0,
          },
          {
            question: 'What does URL stand for?',
            options: ['Uniform Resource Locator', 'Universal Remote Locator', 'Uniform Remote Locator', 'Unified Resource Locator'],
            correctOption: 0,
          },
          {
            question: 'What is the process of converting high-level programming language into machine code called?',
            options: ['Compiling', 'Interpreting', 'Translating', 'Debugging'],
            correctOption: 0,
          },
          {
            question: 'What does RAM stand for?',
            options: ['Random Access Memory', 'Read-Only Memory', 'Rapid Access Memory', 'Remote Access Memory'],
            correctOption: 0,
          },
          {
            question: 'What is the world wide web also known as?',
            options: ['Web 2.0', 'Internet', 'Hypernet', 'Dark Web'],
            correctOption: 1,
          },
          {
            question: 'What is the most common programming language used for creating websites?',
            options: ['C++', 'Python', 'Ruby', 'HTML/CSS/JavaScript'],
            correctOption: 3,
          },
          {
            question: 'What is the main function of an operating system?',
            options: ['Running applications', 'Managing hardware resources', 'Managing user accounts', 'Creating documents'],
            correctOption: 1,
          },
          {
            question: 'Which data structure operates in a "first-in, first-out" manner?',
            options: ['Stack', 'Queue', 'Linked List', 'Tree'],
            correctOption: 1,
          },
          {
            question: 'What is the purpose of an SQL database?',
            options: ['Creating visual effects', 'Storing and managing data', 'Rendering web pages', 'Creating animations'],
            correctOption: 1,
          },
          {
            question: 'What does SSL stand for in the context of internet security?',
            options: ['Secure Socket Layer', 'Safe and Secure Logging', 'Structured System Language', 'Server Security Level'],
            correctOption: 0,
          },
          {
            question: 'Which company developed the Python programming language?',
            options: ['Microsoft', 'Google', 'Apple', 'Python Software Foundation'],
            correctOption: 3,
          },
          {
            question: 'What does VPN stand for?',
            options: ['Virtual Private Network', 'Very Private Network', 'Virtual Public Network', 'Verified Personal Network'],
            correctOption: 0,
          },
          {
            question: 'What is the primary function of a router in a network?',
            options: ['Processing data', 'Providing power', 'Connecting devices', 'Directing traffic'],
            correctOption: 3,
          },
          {
            question: 'What does IDE stand for in the context of programming?',
            options: ['Internet Document Editor', 'Integrated Development Environment', 'Internal Data Exchange', 'Interface Design Enhancer'],
            correctOption: 1,
          },
          {
            question: 'What is the primary purpose of a firewall?',
            options: ['Running applications', 'Managing hardware resources', 'Protecting against unauthorized access', 'Creating documents'],
            correctOption: 2,
          },
          {
            question: 'Which programming language is known for its use in web development and is often used for creating dynamic web pages?',
            options: ['Python', 'C++', 'Java', 'JavaScript'],
            correctOption: 3,
          },
          {
            question: 'What does API stand for in programming?',
            options: ['Advanced Programming Interface', 'Application Programming Interface', 'Automated Programming Interface', 'Advanced Protocol Integration'],
            correctOption: 1,
          },
          {
            question: 'Which component of a computer is responsible for performing arithmetic and logical operations?',
            options: ['Memory', 'Hard Drive', 'Central Processing Unit (CPU)', 'Monitor'],
            correctOption: 2,
          },
          {
            question: 'What is the purpose of version control systems like Git?',
            options: ['Managing software licenses', 'Tracking changes to source code', 'Providing internet connectivity', 'Creating user interfaces'],
            correctOption: 1,
          },
          {
            question: 'What is a DNS used for in networking?',
            options: ['Data Network Server', 'Distributed Network System', 'Domain Name System', 'Digital Network Security'],
            correctOption: 2,
          },
          {
            question: 'Which data structure organizes elements in a hierarchical manner?',
            options: ['Queue', 'Linked List', 'Stack', 'Tree'],
            correctOption: 3,
          },
          {
            question: 'Which programming language is commonly used for scientific and mathematical computations?',
            options: ['C', 'Java', 'Python', 'Ruby'],
            correctOption: 2,
          },
          {
            question: 'What is the purpose of a cache in computer systems?',
            options: ['Storing user data', 'Executing programs', 'Managing hardware resources', 'Storing frequently accessed data'],
            correctOption: 3,
          },
          {
            question: 'What does SQL stand for?',
            options: ['Structured Query Language', 'System Quality Language', 'Server Query Logic', 'Software Query Library'],
            correctOption: 0,
          },
          {
            question: 'What is a binary code used for in computing?',
            options: ['Storing images', 'Encoding characters using 4 bits', 'Representing data using only 1s', 'Storing large amounts of data'],
            correctOption: 2,
          },
          {
            question: 'Which programming language is known for its use in creating web-based applications?',
            options: ['Python', 'Java', 'C++', 'Ruby'],
            correctOption: 1,
          },
          {
            question: 'What is the term used for the process of converting source code into machine code?',
            options: ['Debugging', 'Compiling', 'Interpreting', 'Translating'],
            correctOption: 1,
          },
          {
            question: 'What is a firewall used for in network security?',
            options: ['Providing internet connectivity', 'Managing hardware resources', 'Protecting against unauthorized access', 'Running applications'],
            correctOption: 2,
          },
          {
            question: 'Which type of network topology connects each device to a central hub?',
            options: ['Ring', 'Bus', 'Star', 'Mesh'],
            correctOption: 2,
          },
          {
            question: 'Which type of attack aims to flood a network or website with excessive traffic to make it unavailable?',
            options: ['Phishing', 'Malware', 'Denial-of-Service (DoS)', 'Spyware'],
            correctOption: 2,
          },
          {
            question: 'What is the purpose of the "if" statement in programming?',
            options: ['Defining functions', 'Creating loops', 'Making decisions', 'Executing algorithms'],
            correctOption: 2,
          },
          {
            question: 'What is a server used for in networking?',
            options: ['Storing user data', 'Executing client-side scripts', 'Providing internet connectivity', 'Serving web pages and data'],
            correctOption: 3,
          },
          {
            question: 'Which type of software allows users to browse the web?',
            options: ['Operating System', 'Word Processor', 'Web Browser', 'Antivirus'],
            correctOption: 2,
          },
          {
            question: 'Which component of a computer is responsible for storing data even when the power is turned off?',
            options: ['RAM', 'CPU', 'Hard Drive', 'Monitor'],
            correctOption: 2,
          },
          {
            question: 'What does SSL/TLS protocol provide in web security?',
            options: ['File Sharing', 'Database Management', 'Secure Communication', 'Remote Access'],
            correctOption: 2,
          },
        
    ];
    this.randomizedQuestions = this.shuffleQuestions(this.questions).slice(0, 10);
  }

  componentDidMount() {
    this.timerInterval = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  updateTimer = () => {
    if (this.state.timeRemaining > 0) {
      this.setState((prevState) => ({
        timeRemaining: prevState.timeRemaining - 1,
      }));
    } else {
      this.endQuiz();
    }
  };

  shuffleQuestions = (questions) => {
    // Shuffling algorithm (Fisher-Yates)
    const shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    return shuffledQuestions;
  };

  handleOptionChange = (event) => {
    const updatedSelectedOptions = [...this.state.selectedOptions];
    updatedSelectedOptions[this.state.currentQuestion] = parseInt(event.target.value);

    this.setState({
      selectedOptions: updatedSelectedOptions,
    });
  };

  handlePrev = () => {
    if (this.state.currentQuestion > 0) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion - 1,
      }));
    }
  };

  handleNext = () => {
    if (this.state.currentQuestion < this.randomizedQuestions.length - 1) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
      }));
    }
  };

  handleSubmit = () => {
    if (this.state.quizEnded) {
      return; // If the quiz has already ended, do nothing
    }

    this.endQuiz();
  };

  endQuiz = () => {
    clearInterval(this.timerInterval);
    const score = this.calculateScore();
    this.setState({ score, quizEnded: true });
  };

  calculateScore = () => {
    let score = 0;
    for (let i = 0; i < this.randomizedQuestions.length; i++) {
      if (this.state.selectedOptions[i] === this.randomizedQuestions[i].correctOption) {
        score++;
      }
    }
    return score;
  };

  render() {
    const currentQuestion = this.randomizedQuestions[this.state.currentQuestion];

    return (
      <div className="quiz-container">
        <h1>General Knowledge Quiz</h1>
        {this.state.quizEnded ? (
          <div>
            <p>Your score: {this.state.score} out of {this.randomizedQuestions.length}</p>
            {this.state.timeRemaining <= 0 && <p>Time's up!</p>}
          </div>
        ) : (
          <div>
            <p>{currentQuestion.question}</p>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <div className="option" key={index}>
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={this.state.selectedOptions[this.state.currentQuestion] === index}
                    onChange={this.handleOptionChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <button onClick={this.handlePrev} disabled={this.state.currentQuestion === 0}>Previous</button>
            <button onClick={this.handleNext} disabled={this.state.currentQuestion === this.randomizedQuestions.length - 1}>Next</button>
            <button onClick={this.handleSubmit}>Submit</button>
            <p>Time Remaining: {Math.floor(this.state.timeRemaining / 60)}:{(this.state.timeRemaining % 60).toString().padStart(2, '0')}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
