import React, { Component } from "react";
import VizCanvas from "../components/VizCanvas";
import Dropdown from "../components/Dropdown";
import AutoSuggest from "../components/AutoSuggest";
import SelectionKpis from "../components/SelectionKpis";
import TSne from "../js/TSne";
import "../css/Home.css";
import { modelData, nodeData, allData } from "../models/mappings";
import Legends from "../components/Legends";

import { kpiMapping } from "../models/mappings";

console.log("node data", nodeData);
console.log("model data", modelData);

class Home extends Component {
  constructor() {
    super();

    this.state = {
      positionData: [],
      tsneComplete: false,
      nodeData,
      modelData,
      sizeKpi: kpiMapping[Object.keys(kpiMapping)[0]],
      colorKpi: kpiMapping[Object.keys(kpiMapping)[0]],
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
          <div className="control">
            <a href="/maps" target="_blank">
              Overview maps
            </a>
          </div>
        </div>

        <VizCanvas
          positionData={this.state.positionData}
          nodeData={this.state.nodeData}
          radiusValue={this.state.sizeKpi}
          colorValue={this.state.colorKpi}
          onClick={node => this._selectNode(node)}
        />

        <div className="footer">
          2019 -{" "}
          <a href="http://tylernwolf.com?ref=mobilityObserver" target="_blank">
            Tyler Wolf,
          </a>{" "}
          Karl-Anton Brötmark and Adam Ekberg - Data Source:{" "}
          <a href="https://www.kolada.se" target="_blank">
            https://www.kolada.se
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
