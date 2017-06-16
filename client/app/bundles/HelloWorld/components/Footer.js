import React from 'react';

class Footer extends React.Component {
  handleClick() {
    window.location.reload();
  }
  remainingCount() {
    if (this.props.gameState !== "recall") {
      if (this.props.gameState === "won" || this.props.gameState === "lost") {
        return (
	  <div className="row">
            <button className="play-again-button btn btn-default" onClick={this.handleClick}>
	      Play Again
	    </button>
            <a className="btn btn-default" href="/" role="button">
	      Choose an activity
	    </a>
	  </div>
        );
      }
      return null;
    }
    return (
      <div className="remaining-count">
        {this.props.activeCellsCount - this.props.correctGuesses.length}
      </div>
    );
  }

  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]}...
        </div>
	{this.remainingCount()}
      </div>
    );
  }
}

Footer.defaultProps = {
 hints: {
   ready: "Get Ready",
   memorize: "Memorize",
   recall: "Recall",
   won: "Well Played",
   lost: "Game Over",
 }
}

export default Footer;