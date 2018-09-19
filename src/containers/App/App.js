import React, { Component } from 'react'
import logo from '../../images/logo.svg'
import './App.css'
import Blank from '../../components/Blank/Blank'
import Example from '../../components/Example/Example'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Project Structure Template</h1>
        </header>
        <Blank />
        <Example name="chaow" />
      </div>
    )
  }
}

export default App
