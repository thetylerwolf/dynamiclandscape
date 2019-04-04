import React, { Component } from "react"
import VizCanvas from '../components/VizCanvas'
import TSne from '../js/TSne'
import '../css/Home.css'

class Home extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    this.TSNE = new TSne({
      onProgress: (msg) => { console.log(msg) },
      readyStateChange: (msg) => { console.log(msg) },
      onComplete: (msg) => { console.log(msg) },
    })

    this.TSNE.init()
  }


  render() {
    return (<VizCanvas data={ [] }></VizCanvas>)
  }
}

export default Home;
