import React, { Component } from "react";
import * as d3 from 'd3'
import '../css/Legends.css'


class Dropdown extends Component {

  constructor(props) {
    super();
  }

  render() {
    let color = this.props.colorData,
      size = this.props.sizeData

    return (
      <div className="legends-container">

        <div className="legend-color">
          <div className="legend-title">{ color.name }</div>
          <div className="colors-blocks">
            {
              d3.range(0,1.2,0.2).map((d,i) => {
                return(
                  <div className="block"
                    key={ i }
                    style={{
                      backgroundColor: d3.interpolateViridis(d),
                      width: (100/6) + '%',
                      left: (100*i/6) + '%'
                    }}
                  >
                  </div>
                )
              })
            }
          </div>
          <div className="colors-values">
            <div className="colors-min colors-value">{ color.min ? color.min.toFixed(0) : '' }</div>
            <div className="colors-max colors-value">{ color.max ? color.max.toFixed(0) : '' }</div>
          </div>

        </div>

        <div className="legend-size">
          <div className="legend-title">{ size.name }</div>
            <div className="sizes-circles">
              <div className="big-circle"></div>
              <div className="medium-circle"></div>
              <div className="small-circle"></div>
            </div>
            <div className="sizes-values">
              <div className="sizes-min">{ size.min ? size.min.toFixed(0) : '' }</div>
              <div className="sizes-max">{ size.max ? size.max.toFixed(0) : '' }</div>
            </div>
        </div>

      </div>
    );
  }
}

export default Dropdown;
