import React, { Component } from 'react'
import logo from 'Images/logo.svg'
import './App.css'
import Blank from 'Components/Blank'
import Example from 'Components/Example'

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
