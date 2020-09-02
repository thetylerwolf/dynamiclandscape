import React, { Component } from "react";
import Select from "react-select";

interface state {
  selectedOption?: any
}

interface props {
  onChange: (d: any) => void
  data: any
  placeholder: any
  default: number
}

class Dropdown extends Component<props> {
  options: any[] = []
  state: state

  constructor(props: any) {
    super(props);

    Object.entries(props.data).forEach(([key, value], i) => {
      const v: any = value
      this.options.push( {value: key, label: key} );
    });

    this.state = {
      selectedOption: this.options[this.props.default],
    }

    this.props.onChange({ selectedOption: this.state.selectedOption })
  }

  onChange(selectedOption: any){
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
          menuPlacement={'top'}
          classNamePrefix={'legend-dropdown'}
        />
      </div>
    );
  }
}

export default Dropdown;
