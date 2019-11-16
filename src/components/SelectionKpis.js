import React, { Component } from "react"
import { kpiMapping } from '../models/mappings'
import '../css/SelectionKpis.scss'

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

        <div className="municipality-wrap">

          <div className="municipality-name">{ this.props.node.name }</div>

          { this.props.node && this.props.node.kpis.map((kpi,i) => {
              if(kpi) {
                const kpiInfo = kpiMapping[ kpi.id ]

                let min = kpiInfo.min ? kpiInfo.min.toFixed(0) : 'No min',
                  max = kpiInfo.max ? kpiInfo.max.toFixed(0) : 'No max',
                  // median = kpiInfo.median ? kpiInfo.median.toFixed(0) : 'No mean',
                  value = kpi.value > -1 ? kpi.value.toFixed(1) : 'No data'

                return (
                  <div key={ i }>
                    <div className="kpi-title">
                      { kpiInfo.name }
                    </div>
                    <div className="kpi-value-container">
                      <div className="kpi-value-bar" style={{ backgroundColor: this.props.node.color, width: (100 * kpi.value/kpiInfo.max) + '%' }}></div>
                      <div className="kpi-min">{ min }</div>
                      {/* <div className="kpi-mean">{ median }</div> */}
                      <div className="kpi-value">{ value }</div>
                      <div className="kpi-max">{ max }</div>
                    </div>
                  </div>
                )
              }
            })
          }

        </div>
      </div>
    )
  }
}

export default SelectionKpis;
