import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      error: false,
    }

    this.decrementCounter = this.decrementCounter.bind(this)
    this.incrementCounter = this.incrementCounter.bind(this)
  }

  decrementCounter() {
    if (this.state.counter === 0) {
      this.setState({ error: true });
    } else {
      const counter = this.state.counter - 1;
      this.setState({ counter });
    }
  }

  incrementCounter() {
    const counter = this.state.counter + 1;
    if (this.state.error) {
      this.setState({ counter, error: false }); 
    } else {
      this.setState({ counter });
    }
  }

  render() {
    const { counter, error } = this.state;

    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {counter}</h1>
        <button
          data-test="decrement-button"
          onClick={this.decrementCounter}
        >
          Decrement counter
        </button>
        <button
          data-test="increment-button"
          onClick={this.incrementCounter}
        >
          Increment counter
        </button>

        {error && <p data-test="decrement-error">You cannot go under 0</p>}
      </div>
    );
  }
}

export default App;
