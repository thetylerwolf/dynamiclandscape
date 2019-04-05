import React, { Component } from "react";
import { ReactComponent as Map } from "../data_set/municipalities.svg";
import { scaleLinear } from "d3-scale";
import { schemeRdBu } from "d3-scale-chromatic";

import * as mappings from "../models/mappings.js";

class App extends Component {
  constructor() {
    super();
    this.state = { extent: [] };
  }

  componentDidMount() {
    let map = this.refs.swedenMap;
    let kpi = mappings.allData.find(d => d.id == this.props.id);
    let munis = kpi.municipalities;

    munis.forEach((muni, j) => {
      let muniId = muni.id;
      let muniName = mappings.municipalityIds[muniId];

      let kpiValue = muni.value;

      muniName = cleanString(muniName);

      let path = map.getElementById(muniName);
      if (!path) console.log(muniId, path);
      let tylerMapping = mappings.kpiMapping[kpi.id];
      let r = [tylerMapping.min, tylerMapping.max];
      let med = tylerMapping.median;
      let scale = scaleLinear()
        .domain([r[0], med, r[1]])
        .range(schemeRdBu[3]);
      if (path && kpiValue) {
        path.style.fill = scale(kpiValue);
      }

      this.setState({ extent: r });
    });
  }

  render() {
    return (
      <div className="map-wrap">
        <Map ref="swedenMap" />
        <div style={{ color: schemeRdBu[3][2] }}>
          Max {this.state.extent[1] && this.state.extent[1].toFixed(2)}
        </div>
        <div style={{ color: schemeRdBu[3][0] }}>
          Min {this.state.extent[0] && this.state.extent[0].toFixed(2)}
        </div>
      </div>
    );
  }
}

function cleanString(string) {
  string = string.replace(/ä/g, "\\xE4");
  string = string.replace(/Ä/g, "\\xC4");
  string = string.replace(/ö/g, "\\xF6");
  string = string.replace(/Ö/g, "\\xD6");
  string = string.replace(/å/g, "\\xE5");
  string = string.replace(/Å/g, "\\xC5");
  return string;
}

export default App;
