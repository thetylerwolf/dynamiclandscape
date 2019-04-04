import React, { Component } from "react"
import goalIdLookup from '../data_set/mapping/goalIdMapping.json'
import SmallMap from './SmallMap'

class MapMultiples extends Component {

  maps() {

    return this.props.data.ids.map(id => {
      return (
        <div style={{ width:'300px' }} key={ id }>
          <div>{ goalIdLookup[ id ] }</div>
          <SmallMap id={ id } />
        </div>
      )
    })
  }

  render() {
    let maps = this.maps()

    return (
      <div className="multiples-wrap">
        <div>
          <h3>{ this.props.data.name }</h3>
          <div className="maps-wrap" style={{ display:'flex' }}>
          { maps }
          </div>
        </div>

      </div>
    )
  }
}

export default MapMultiples;
