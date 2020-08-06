import React from 'react';
import './Counter.css';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    let count = this.state.count;
    this.setState({ count: count + 1 });
  }

  decrement() {
    let count = this.state.count;
    this.setState({ count: count - 1 });
  }

  reset() {
    this.setState({ count: 0 });
  }

  render() {
    return (
      <div className="counter-container">
        <div className="count"><h1>{this.state.count}</h1></div>
        <div className="counter-buttons-div">
          <button className="minus-button" onClick={this.decrement}>-</button>
          <button className="add-button" onClick={this.increment}>+</button>
        </div>
        <button className="reset-button" onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

