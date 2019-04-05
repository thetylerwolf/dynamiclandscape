import React, { Component } from "react"
import VizCanvas from '../components/VizCanvas'
import TSne from '../js/TSne'
import '../css/Home.css'
import goalsData from '../data_set/goals/all_goals_all_years.json'

// Get all kpi ids from first municipality (arbitrary choice)
let kpis = goalsData.municipalities[0].kpis.reduce((acc,d) => {
    acc[d.id] = d.id
    return acc
  },{})

kpis = Object.keys(kpis)

let nodeData = goalsData.municipalities

let modelData = goalsData.municipalities.map(municipality => {
  // sort kpis in municipality by year
  municipality.kpis.sort((a,b) => a.year - b.year)
  // reverse to put most recent first
  municipality.kpis.reverse()
  // for each kpi we have in our list
  let muniKpis = kpis.map(kpi => {
    // find the most recent occurrence in this municipality
    return municipality.kpis.find(d => kpi === d.id)
  })

  municipality.kpis = muniKpis

  let kpiArr = muniKpis.map(kpi => {
    let v = kpi && kpi.value
    return v || -1
  })

  return kpiArr

})

console.log(modelData)

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
        <div className="filter-container">
          { this.state.selectedNode && this.state.selectedNode.kpis.map((kpi,i) => {
              if(kpi) {
                return (<div key={ i }>
                  { kpi.id } - { kpi.value.toFixed(1) }
                </div>)
              }
            })
          }
        </div>
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
