import React, { Component } from "react"
import MapMultiples from './components/MapMultiples'
import goalSections from './data_set/goalSections.json'
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
    let multiplesSections = goalSections.map((sec,i) => {
      return (
        <MapMultiples data={ sec } key={ i } />
      )
    })

    return multiplesSections
  }
}

export default App;
