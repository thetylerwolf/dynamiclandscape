import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

//npm install topojson
//npm install d3-geo topojson-client --save

const width = 1500;
const height = 900;

class SmallMap extends Component {
  constructor() {
    super();
    this.state = {
      mapData: []
    };
  }

  projection() {
    return geoMercator()
      .scale(1500)
      .center([-7, 63])
      .translate([width / 4, height / 2]);
  }

  componentDidMount() {
    fetch("/sweden.json").then(response => {
      if (response.status !== 200) {
        console.log(`Error: ${response.status}`);
        return;
      }
      response.json().then(mapData => {
        this.setState({
          mapData: feature(mapData, mapData.objects.SWE_adm1).features
        });
      });
    });
  }

  handleClick(index) {
    console.log(
      "Clicked on län: ",
      this.state.mapData[index].properties.NAME_1
    );
  }

  render() {
    return (
      <svg width={width} height={height}>
        <g className="map">
          {this.state.mapData.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(this.projection())(d)}
              fill={"rgba(30,80,55,0.7"}
              stroke="#FFFFFF"
              strokeWidth={0.5}
              onClick={() => this.handleClick(i)}
            />
          ))}
        </g>
      </svg>
    );
  }
}

export default SmallMap;
