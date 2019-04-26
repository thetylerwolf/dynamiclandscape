import React, { Component } from "react";
import VizCanvas from "../components/VizCanvas";
import Dropdown from "../components/Dropdown";
import AutoSuggest from "../components/AutoSuggest";
import SelectionKpis from "../components/SelectionKpis";
import DimensionPicker from "../components/DimensionPicker";
import "../css/Home.css";
import { modelData, nodeData, allData } from "../models/mappings";
import Legends from "../components/Legends";
import tsnejs from '../js/tsnejs'

import { kpiMapping } from "../models/mappings";

class Home extends Component {
  constructor() {
    super();

    // console.log("kpiMapping", JSON.stringify(kpiMapping, null, 4));
    // console.log("Object.keys(kpiMapping)[0]", Object.keys(kpiMapping)[0]);
    // console.log(
    //   "kpiMapping[Object.keys(kpiMapping)[0]]",
    //   JSON.stringify(kpiMapping[Object.keys(kpiMapping)[0]], null, 4)
    // );

    this.state = {
      positionData: [],
      tsneComplete: false,
      nodeData,
      modelData,
      sizeKpi: kpiMapping[Object.keys(kpiMapping)[0]], // update this as well?
      colorKpi: kpiMapping[Object.keys(kpiMapping)[0]], // update this as well?
      selectedMunicipalityId: null,
      dataUpdate: false
    };
  }

  componentDidMount() {
    this._createTSNE();
    // this.TSNE.init();
  }

  componentDidUpdate() {

  }

  _createTSNE() {

    let opt = {
      epsilon: 10,
      perplexity: 90,
      dim: 2
    }

    if(!this.TSNE) {
      this.TSNE = new tsnejs.tSNE(opt);
    }

    this.TSNE.initDataRaw( this.state.modelData );

    this._runTSNE()
  }

  _runTSNE() {
    let steps = 0

    this.animateTSNE = () => {
      if(this.state.dataUpdate) {
        this._createTSNE()
        this.setState({ dataUpdate: false })
        return steps = 0
      }

      if(steps > 2000) {
        return
      }

      this.TSNE.step();

      const positionData = this.TSNE.getSolution();

      this.setState({
        positionData
      })

      steps++

      requestAnimationFrame(this.animateTSNE)
    }

    requestAnimationFrame(this.animateTSNE)
  }

  _stopTSNE() {
    this.animateTSNE = () => {}
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
    let selectedNode = null;

    nodeData.forEach(node => {
      let isNode = node.id == id;

      node.active = isNode;
      node.selected = isNode;

      if (isNode) selectedNode = node;
    });

    // let node = this.props.nodeData[ hitNode.index ]

    this.setState({ selectedNode });
  }

  _changeDimensions(dims) {

    const updatedNodeData = nodeData.map((node,i) => {
      let kpis = node.kpis.filter(kpi => dims.includes(kpi.id))

      return {
        ...node,
        kpis
      }

    })

    let updatedModelData = updatedNodeData.map(muni => {
      const kpiArr = muni.kpis.map(kpi => {
        const v = kpi.value === undefined ? -1 : kpi.value;

        return v;
      });

      return kpiArr;
    });

    // If no data, return all zeroes for everything
    if(!updatedModelData[0].length) {
      updatedModelData = updatedModelData.map(() => [0])
    }

    // const visibleKpis = dims.map(dim => ({ key: dim, value: kpiMappings[dim].name }))

    this.setState({
      // nodeData: updatedNodeData,
      modelData: updatedModelData,
      dataUpdate: true,
    });

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
            <DimensionPicker
              dimensions={ [] }
              onChange={ (dims) => this._changeDimensions(dims) }
            />
          </div>
        </div>

        <VizCanvas
          fullNodeData={ nodeData }
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
