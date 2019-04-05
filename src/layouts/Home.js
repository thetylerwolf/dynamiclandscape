import React, { Component } from "react";
import VizCanvas from "../components/VizCanvas";
import Dropdown from "../components/Dropdown";
import AutoSuggest from "../components/AutoSuggest";
import SelectionKpis from "../components/SelectionKpis";
import CheckBox from "../components/CheckBox";
import TSne from "../js/TSne";
import "../css/Home.css";
import { modelData, nodeData, allData } from "../models/mappings";
import Legends from "../components/Legends";

import { kpiMapping } from "../models/mappings";

const headingMapping = require("../data_set/mapping/headingMapping.json");

console.log("node data", nodeData);
console.log("model data", modelData);
var displayKpiIds = [];

class Home extends Component {
  constructor() {
    super();

    let headings = [];
    for (var i = 0; i < headingMapping.length; i++) {
      headings.push(headingMapping[i]);

      for (var j = 0; j < headingMapping[i].ids.length; j++) {
        displayKpiIds.push(headingMapping[i].ids[j]);
      }
    }

    this.state = {
      positionData: [],
      tsneComplete: false,
      nodeData,
      modelData,
      sizeKpi: kpiMapping[Object.keys(kpiMapping)[0]],
      colorKpi: kpiMapping[Object.keys(kpiMapping)[0]],
      headings: headings,
      selectedMunicipalityId: null
    };
  }

  componentDidMount() {
    this.TSNE = new TSne({
      onProgress: msg => {
        // console.log('progress', msg)
        this.setState({
          positionData: msg
        });
      },
      readyStateChange: msg => {
        // console.log('statechange', msg)
        if (msg === "READY" && !this.state.tsneComplete) {
          setTimeout(() => this.TSNE.run(), 33);
        }
      },
      onComplete: msg => {
        // console.log('complete', msg)
        this.setState({
          tsneComplete: true
        });
      },
      perplexity: 90,
      earlyExaggeration: 2.5,
      learningRate: 60,
      iterations: 2000,
      metric: "euclidean",
      dim: 2,
      data: this.state.modelData
    });

    this.TSNE.init();
  }

  _selectNode(node) {
    this.setState({ selectedNode: node });
  }

  _selectColor({ selectedOption }) {
    //this.setState({ selectedColor: color })
    console.log("color", selectedOption);
    this.setState({ colorKpi: kpiMapping[selectedOption.value] });
  }

  _selectSize({ selectedOption }) {
    //this._selectSize({ selectedSize: size })
    console.log("size", selectedOption);
    this.setState({ sizeKpi: kpiMapping[selectedOption.value] });
  }

  _changeGoalIds(changedGoalsIds) {
    if (changedGoalsIds.checkValue) {
      for (var i = 0; i < changedGoalsIds.ids.length; i++) {
        displayKpiIds.push(changedGoalsIds.ids[i]);
      }
    } else {
      displayKpiIds.filter(id => id === changedGoalsIds.ids[i]);
    }
    console.log(displayKpiIds);
  }

  _selectedMunicipalityId(id) {
    nodeData.forEach(node => {
      node.active = node.id == id;
      node.selected = node.id == id;
    });

    // let node = this.props.nodeData[ hitNode.index ]

    this.setState({ selectedMunicipalityId: id });
  }

  render() {
    return (
      <div className="home-wrap">
        <Legends
          colorData={this.state.colorKpi}
          sizeData={this.state.sizeKpi}
        />

        <SelectionKpis node={this.state.selectedNode} />

        <div className="controls-container">
          <div className="control">
            <Dropdown
              data={kpiMapping}
              placeholder="Select color"
              onChange={color => this._selectColor(color)}
            />
          </div>

          <div className="control">
            <Dropdown
              data={kpiMapping}
              placeholder="Select size"
              onChange={size => this._selectSize(size)}
            />
          </div>

          <div className="control">
            <AutoSuggest
              selectedMunicipalityId={selectedMunicipalityId =>
                this._selectedMunicipalityId(selectedMunicipalityId)
              }
            />
          </div>
        </div>

        {this.state.headings.map(element => {
          return [
            <CheckBox
              label={element.name}
              id={element.ids}
              onIdChange={ids => this._changeGoalIds(ids)}
            />
          ];
        })}

        <VizCanvas
          positionData={this.state.positionData}
          nodeData={this.state.nodeData}
          radiusValue={this.state.sizeKpi}
          colorValue={this.state.colorKpi}
          onClick={node => this._selectNode(node)}
        />
      </div>
    );
  }
}

export default Home;
