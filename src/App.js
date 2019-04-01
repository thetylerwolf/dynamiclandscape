import React, { Component } from "react"
import ForceHome from './components/ForceHome'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      school: ''
    }
  }

  componentDidMount() {

  }

  handleClick(index) {
    console.log("Clicked on: ", this.state)
  }

  render() {
    return (
      <ForceHome />
    )
  }
}

export default App;
