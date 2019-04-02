import React, { Component } from "react"
import { ReactComponent as Map } from '../data_set/municipalities.svg'
import mId from '../data_set/municipalityIdMapping.json'
import { extent, median } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { schemeRdBu } from 'd3-scale-chromatic'

class App extends Component {

  constructor() {
    super()

    this.state = { extent: [] }
  }

  componentDidMount() {
    let map = this.refs.swedenMap,
      id = this.props.id

    fetch(`/goals/${ id }.json`)
      .then(response => {
        if (response.status !== 200) {
          console.log(`Error: ${response.status}`)
          return
        }
        response.json().then(data => {

          data.values.forEach(v => v.value = v.values.find(d => d.gender === 'T'))

          let r = extent(data.values, (d) => d.value.value),
            med = median(data.values, (d) => d.value.value),
            scale = scaleLinear()
              .domain([ r[0], med, r[1] ])
              .range(schemeRdBu[3])

          data.values.forEach(v => {
            let id = mId[ v.municipality ]
            id = id.replace(/ä/g, '\\xE4')
            id = id.replace(/Ä/g, '\\xC4')
            id = id.replace(/ö/g, '\\xF6')
            id = id.replace(/Ö/g, '\\xD6')
            id = id.replace(/å/g, '\\xE5')
            id = id.replace(/Å/g, '\\xC5')
            let path = map.getElementById(id)
            if(!path) console.log(id, path)
            if(path && v.value.value) path.style.fill = scale(v.value.value)
          })

          this.setState({ extent: r })
        })
      })

  }

  render() {
    return (
      <div className="map-wrap">
        <Map ref="swedenMap" />
        <div style={{ color: schemeRdBu[3][2] }}>Max { this.state.extent[1] && this.state.extent[1].toFixed(2) }</div>
        <div style={{ color: schemeRdBu[3][0] }}>Min { this.state.extent[0] && this.state.extent[0].toFixed(2) }</div>
      </div>
    )
  }
}

export default App;
