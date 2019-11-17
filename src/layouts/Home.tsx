import React, { Component } from "react";
import VizCanvas from "../components/VizCanvas";
import SelectionKpis from "../components/SelectionKpis";
import Controls from '../components/Controls'
import { modelData, nodeData } from "../models/mappings";
import Legends from "../components/Legends";
import tsnejs from '../js/tsnejs'

import { dimensions } from "../models/mappings";

interface state {
  positionData: []
  tsneComplete: boolean
  nodeData: any
  modelData: any
  sizeKpi: string
  colorKpi: string
  selectedMunicipalityId?: string
  dataUpdate: boolean
  selectedNode?: any
}

class Home extends Component {
  TSNE?: any
  animateTSNE: any = {}
  state: state 

  constructor(props?: any) {
    super(props);

    // console.log("dimensions", JSON.stringify(dimensions, null, 4));
    // console.log("Object.keys(dimensions)[0]", Object.keys(dimensions)[0]);
    // console.log(
    //   "dimensions[Object.keys(dimensions)[0]]",
    //   JSON.stringify(dimensions[Object.keys(dimensions)[0]], null, 4)
    // );

    const kpis: any = dimensions

    const defaultKpi: string = Object.keys(kpis)[0]
    const sizeKpi: string = kpis[ defaultKpi ]
    const colorKpi: string = kpis[ defaultKpi ]


    this.state = {
      positionData: [],
      tsneComplete: false,
      nodeData,
      modelData,
      sizeKpi, // update this as well?
      colorKpi, // update this as well?
      selectedMunicipalityId: undefined,
      dataUpdate: false
    };
  }

  componentDidMount() {
    this._createTSNE();
    // this.TSNE.init();
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

  _selectNode(node: any) {
    this.setState({ selectedNode: node });
  }

  _selectColor({ selectedOption }: { selectedOption: any }) {
    //this.setState({ selectedColor: color })
    console.log("color", selectedOption)
    const kpi: any = dimensions
    const colorKpi: string = kpi[selectedOption.value]
    this.setState({ colorKpi })
  }

  _selectSize({ selectedOption }: { selectedOption: any } ) {
    //this._selectSize({ selectedSize: size })
    console.log("size", selectedOption)
    const kpi: any = dimensions
    const sizeKpi: string = kpi[selectedOption.value]
    this.setState({ sizeKpi })
  }

  _selectedMunicipalityId(id: string) {
    let selectedNode = null;

    nodeData.forEach((node: any) => {
      let isNode = node.id == id;

      node.active = isNode;
      node.selected = isNode;

      if (isNode) selectedNode = node;
    });

    // let node = this.props.nodeData[ hitNode.index ]

    this.setState({ selectedNode });
  }

  _changeDimensions(dims: string[]) {

    const updatedNodeData = nodeData.map((node,i) => {
      let dimensions = node.dimensions.filter(dimension => dims.includes(dimension.id))

      return {
        ...node,
        dimensions
      }

    })

    let updatedModelData = updatedNodeData.map(muni => {
      const kpiArr = muni.dimensions.map((kpi: any) => {
        const v = kpi.value === undefined ? -1 : kpi.value;

        return v;
      });

      return kpiArr;
    });

    // If no data, return all zeroes for everything
    if(!updatedModelData[0].length) {
      updatedModelData = updatedModelData.map(() => [0])
    }

    // const visibleKpis = dims.map(dim => ({ key: dim, value: dimensionss[dim].name }))

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
          onSelectColor={ (color: any) => this._selectColor(color) }
          onSelectSize={ (size: any) => this._selectSize(size) }
          muniSelected={ Boolean(this.state.selectedNode) }
        />

        <SelectionKpis node={this.state.selectedNode} />

        <Controls
          onSelectMunicipalityId={ (id: string) => this._selectedMunicipalityId(id) }
          onChangeDimensions={ (dims: string[]) => this._changeDimensions(dims) }
        />

        <VizCanvas
          fullNodeData={ nodeData }
          positionData={this.state.positionData}
          nodeData={this.state.nodeData}
          radiusValue={this.state.sizeKpi}
          colorValue={this.state.colorKpi}
          onClick={(node: any) => this._selectNode(node)}
        />
      </div>
    );
  }
}

export default Home;
