import React, { Component } from "react";
import { kpiMapping } from "../models/mappings";
import '../css/Dropdown.css'
import Select from "react-select";



class Dropdown extends Component {

  constructor(props) {
    super();

    this.options = [];

    Object.entries(props.data).forEach(([key, value]) => {
        this.options.push( {value: key, label: value.name} );
    });

    this.state = {
      selectedOption: this.options[0],
    }
  }

  onChange(selectedOption){
    this.setState({ selectedOption });
    this.props.onChange({selectedOption})
  }

  render() {
    const { selectedOption } = this.state;

    return (
        <div className="selection-kpis-dropdown">
        <Select
          value={selectedOption}
          onChange={ (option) => this.onChange(option)}
          options={this.options}
          placeholder= {this.props.placeholder}
        />
      </div>
    );
  }
}

export default Dropdown;
