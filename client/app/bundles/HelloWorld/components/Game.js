import _ from "lodash";
import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";
import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.matrix = [];
    for (let r = 0; r < this.props.rows; r++) {
      let row = [];
      for (let c = 0; c < this.props.columns; c++) {
        row.push(`${r}${c}`);
      }
      this.matrix.push(row);
    }

    let flatMatrix = _.flatten(this.matrix);
    this.activeCells = _.
      sampleSize(
                 flatMatrix,
                 this.props.activeCellsCount,
                );

    this.state = {
      gameState: 'ready',
      wrongGuesses: [],
      correctGuesses: [],
    };
  }

  timedOut() {
    let { gameState } = this.state;
    if (gameState === 'recall') {
      this.setState({gameState: 'lost'});
    }
  }

  lostTimer() {
    this.lostTimerId = setTimeout(
                                  this.timedOut.bind(this),
                                  this.props.recallTimeout,
                                 );
  }

  startRecall() {
    this.setState({ gameState: 'recall' },
                  this.lostTimer.bind(this)
                 );
  }

  recallTimer() {
    this.recallTimerId = setTimeout(
                                    this.startRecall.bind(this),
                                    2000,
                                   );
  }

  startMemorize() {
    this.setState({ gameState: 'memorize' },
                  this.recallTimer.bind(this),
                 );
  }

  componentDidMount() {
    this.memorizeTimerId = setTimeout(
                                      this.startMemorize.bind(this),
                                      2000,
                                     );
  }

  componentWillUnmount() {
    clearTimeout(this.memorizeTimerId);
    clearTimeout(this.recallTimerId);
    clearTimeout(this.lostTimerId);
  }

  updateCorrect(cellId) {
    let { correctGuesses, gameState } = this.state;
    correctGuesses.push(cellId);
    if (correctGuesses.length === this.props.activeCellsCount) {
      gameState = "won";
    }
    this.setState({ correctGuesses, gameState });
  }

  updateWrong(cellId) {
    let { wrongGuesses, gameState } = this.state;
    wrongGuesses.push(cellId);
    if (wrongGuesses.length > this.props.allowedWrongAttempts) {
      gameState = "lost";
    }
    this.setState({ wrongGuesses, gameState });
  }

  recordGuess({ cellId, userGuessIsCorrect }) {
    if (userGuessIsCorrect) {
      this.updateCorrect(cellId);
    } else {
      this.updateWrong(cellId);
    }
  }

  showActiveCells() {
    console.log('called sAC')
    return ["memorize","lost"].indexOf(this.state.gameState) >= 0;
  }

  render() {
    let showActive = this.showActiveCells();
    return (
      <div className="grid">
        {this.matrix.map((row, ri) => (
          <Row key={ri}>
            {row.map(cellId => <Cell key={cellId} id={cellId}
                                     activeCells={this.activeCells}
                                     showActiveCells={showActive}
                                     recordGuess={this.recordGuess.bind(this)}
                                     {...this.state} />)}
          </Row>
        ))}

        <Footer {...this.state}
                activeCellsCount={this.props.activeCellsCount} />
     </div>
    );
  }
}

Game.defaultProps = {
  allowedWrongAttempts: 2,
  recallTimeout: 10000, // msec
};

export default Game;
