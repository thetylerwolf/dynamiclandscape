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

let modelData = goalsData.municipalities.map(municipality => {
  // sort kpis in municipality by year
  municipality.kpis.sort((a,b) => a.year - b.year)
  // reverse to put most recent first
  municipality.kpis.reverse()
  // for each kpi we have in our list
  let muniKpis = kpis.map(kpi => {
    // find the most recent occurrence in this municipality
    let found = municipality.kpis.find(d => kpi === d.id)
    let v = found && found.value
    return v || -1
  })

  return muniKpis

})

console.log(modelData)

class Home extends Component {

  constructor() {
    super()

    this.state = {
      positionData: [],
      tsneComplete: false,
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
      perplexity: 55,
      earlyExaggeration: 2.1,
      learningRate: 180,
      iterations: 150,
      metric: 'euclidean',
      data: modelData
    })

    this.TSNE.init()
  }


  render() {
    return (<VizCanvas data={ this.state.positionData }></VizCanvas>)
  }
}

export default Home;
