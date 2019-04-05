import React, { Component } from "react"
import { kpiMapping } from '../models/mappings'
import '../css/SelectionKpis.css'

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
      <div className="selection-kpis-container">
        <div className="municipality-name">{ this.props.node.name }</div>
        { this.props.node && this.props.node.kpis.map((kpi,i) => {
            if(kpi) {
              return (
                <div key={ i }>
                  <div className="kpi-title">
                  { kpi.id }
                  </div>
                  <div className="kpi-value-container">
                    <div className="kpi-min"></div>
                    <div className="kpi-value">{ kpi.value ? kpi.value.toFixed(1) : 'No data' }</div>
                    <div className="kpi-max"></div>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}

export default SelectionKpis;
