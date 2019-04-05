import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

//npm install topojson
//npm install d3-geo topojson-client --save

const width = 1500;
const height = 900;

class SelectionKpis extends Component {

  constructor() {
    super()
  }

  componentDidMount() {

  }

  render() {

    if( !this.props.node ) return (<div />)

    return (
      <div className="filter-container">
        { this.props.node && this.props.node.kpis.map((kpi,i) => {
            if(kpi) {
              return (<div key={ i }>
                { kpi.id } - { kpi.value.toFixed(1) }
              </div>)
            }
          })
        }
      </div>
    )
  }
}

export default SelectionKpis;
