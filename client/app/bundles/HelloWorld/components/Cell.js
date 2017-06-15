import React from 'react';

class Cell extends React.Component {
  active() {
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }

  guessState() {
    if (this.props.correctGuesses.indexOf(this.props.id) >= 0) {
      return true;
    } else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
      return false;
    }
  }

  handleClick() {
    if (this.props.gameState === "recall" && this.guessState() === undefined) {
      this.props.recordGuess({
        cellId: this.props.id,
        userGuessIsCorrect: this.active(),
      });
    }
  }

  render() {
    let klass = "cell";
    if (this.active() && this.props.showActiveCells) {
      klass += " active";
    }
    klass += " guess-" + this.guessState();

    return (
      //<div className="cell" id={this.props.id}>
      //  {this.props.id}
      <div className={klass} onClick={this.handleClick.bind(this)}>
      </div>
    );
  }
}

export default Cell;
