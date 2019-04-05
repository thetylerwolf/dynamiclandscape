import React, { Component } from "react";
import { kpiMapping } from "../models/mappings";
import '../css/SelectionKpis.css'
import Select from "react-select";



class Dropdown extends Component {

    state = {
        selectedOption: null,
      }

  constructor() {
    super();
  }

  onChange(selectedOption){
    this.setState({ selectedOption });
    this.props.onChange({selectedOption})
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    var options = [];

    Object.entries(this.props.data).forEach(([key, value]) => {
        options.push( {value: key, label: value.name} );
    });

    return (
        <div className="selection-kpis-dropdown">
        <Select
          value={selectedOption}
          onChange={ (option) => this.onChange(option)}
          options={options}
          placeholder= {this.props.placeholder}
        />
      </div>
    );
  }
}

export default Dropdown;
