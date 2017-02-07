import React, { Component } from 'react';
import Sum from './components/Sum/Sum';
import CreateComponent from './components/Create/CreateStudent';
class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Class Front</h1>
        <CreateComponent />
      </div>
    );
  }
}

export default App;