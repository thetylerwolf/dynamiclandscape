import React, { Component } from "react"
import VizCanvas from '../components/VizCanvas'
import SelectionKpis from '../components/SelectionKpis'
import TSne from '../js/TSne'
import '../css/Home.css'
import {
  modelData,
  nodeData
} from '../models/mappings'


console.log('node data', nodeData)
console.log('model data', modelData)

class Home extends Component {

  constructor() {
    super()

    this.state = {
      positionData: [],
      tsneComplete: false,
      nodeData,
      modelData
    }
  }

  componentDidMount() {
    this.TSNE = new TSne({
      onProgress: (msg) => {
        // console.log('progress', msg)
        this.setState({
          positionData: msg
        })
      },
      readyStateChange: (msg) => {
        // console.log('statechange', msg)
        if(msg === 'READY' && !this.state.tsneComplete) {
          setTimeout(() => this.TSNE.run(), 33)
        }
      },
      onComplete: (msg) => {
        // console.log('complete', msg)
        this.setState({
          tsneComplete: true
        })
      },
      perplexity: 90,
      earlyExaggeration: 2.5,
      learningRate: 60,
      iterations: 2000,
      metric: 'euclidean',
      dim: 2,
      data: this.state.modelData
    })

    this.TSNE.init()
  }

  _selectNode(node) {

    this.setState({ selectedNode: node })

  }

  render() {


    return (
      <div className="home-wrap">
        <SelectionKpis node={ this.state.selectedNode } />
        <VizCanvas
          positionData={ this.state.positionData }
          nodeData={ this.state.nodeData }
          onClick={ (node) => this._selectNode(node) }
          >
        </VizCanvas>
      </div>
    )
  }
}

export default Home;
