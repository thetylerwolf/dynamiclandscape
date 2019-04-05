import React, { Component } from "react";
import { ReactComponent as Map } from "../data_set/municipalities.svg";
import mId from "../data_set/municipalityIdMapping.json";
import { extent, median } from "d3-array";
import { scaleLinear } from "d3-scale";
import { schemeRdBu } from "d3-scale-chromatic";

const mappings = require("../models/mappings.js");
const allData = require("./nodeData.json");

class App extends Component {
  constructor() {
    super();
    this.state = { extent: [] };
  }

  componentDidMount() {
    let map = this.refs.swedenMap;

    Object.keys(mappings.kpiMapping).forEach(kpi => {
      console.log(kpi);
    });

    /*for (var i = 0; i < allData.length; i++) {
      let muni = allData[i];

      let muniId = muni.id;
      let muniName = muni.name;
      let kpis = muni.kpis;
      console.log("Fetching muni: " + muniName);
      for (var j = 0; j < 1; j++) {
        let kpiId = kpis[j].id;
        console.log("Fetching kpi: " + kpiId);
        let kpiValue = kpis[j].value;
        console.log("kpi value: " + kpiValue);
        let path = map.getElementById(muniId); //id = muniId
        console.log("muni id: " + muniId);

        //if (!path) console.log(id, path);

        let tylerMapping = mappings.kpiMapping[kpiId];

        let r = [tylerMapping.min, tylerMapping.max];
        console.log("r: " + r);

        let med = tylerMapping.median;
        console.log("med: " + med);
        let scale = scaleLinear()
          .domain([r[0], med, r[1]])
          .range(schemeRdBu[3]);

        if (path && kpiValue) {
          path.style.fill = scale(kpiValue); // v.value.value = value of the kpi for that muni
        }

        this.setState({ extent: r });
      }
    }*/
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

export default App;
