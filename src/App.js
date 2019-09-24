import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div data-test="component-app">
        <h1>App</h1>
      </div>
    );
  }
}

export default App;
