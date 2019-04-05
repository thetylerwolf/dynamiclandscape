import React, { Component } from "react"
import VizCanvas from '../components/VizCanvas'
import SelectionKpis from '../components/SelectionKpis'
import TSne from '../js/TSne'
import '../css/Home.css'
import goalsData from '../data_set/goals/all_goals_latest_years.json'
import municipalityIds from '../data_set/municipalityIdMapping.json'

// Get all kpi ids from first municipality (arbitrary choice)
let kpis = goalsData.kpis.map(kpi => {
    return kpi.id
  })

kpis = Object.keys(kpis).sort()

const municipalities = Object.keys(municipalityIds).sort()

const nodeData = municipalities.map(muniId => {

  return {
    kpis: goalsData.kpis.map(kpi => {
      return {
        ...(kpi.municipalities.find(m => m.id == muniId) || {}),
        id: kpi.id
      }
    }),
    id: muniId,
    active: true,
    name: municipalityIds[ muniId ]
  }

})

console.log('node data', nodeData)

let modelData = nodeData.map(muni => {

  let kpiArr = muni.kpis.map(kpi => {

    let v = kpi.value === undefined ? -1 : kpi.value

    return v
  })

  return kpiArr

})

console.log('model data', modelData)

class Home extends Component {

  constructor() {
    super()

    this.nodeData = modelData

    this.state = {
      positionData: [],
      tsneComplete: false,
      nodeData
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
      perplexity: 50,
      earlyExaggeration: 2.1,
      learningRate: 50,
      iterations: 2000,
      metric: 'euclidean',
      dim: 2,
      data: modelData
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
