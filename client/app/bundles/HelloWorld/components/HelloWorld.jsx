import PropTypes from 'prop-types';
import React from 'react';
// import Container from "./Container";

export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    this.state = { name: this.props.name };

    this.updateName = this.updateName.bind(this);
  }

  updateName = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <h3>
          Hello, {this.state.name}!
        </h3>
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
          <input
            data-role="name-input-for-greeting"
            id="name"
            type="text"
            value={this.state.name}
            onChange={this.updateName}
          />
        </form>
      </div>
    );
  }
}
