import React, { Component } from 'react';
import Sum from './components/Sum/Sum';
import Registration from './components/Registration/Registration'
import CreateStudent from './components/Create/CreateStudent';
import Klass from './components/Klass/Klass';
class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Class Front</h1>
        <Registration />
      </div>
    );
  }
}

export default App;