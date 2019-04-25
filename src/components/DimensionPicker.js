import React, { Component } from "react";
import { merge } from 'd3-array';

import CheckBox from './CheckBox';

import headingMapping from "../data_set/mapping/headingMapping.json";
import _ from 'lodash'

class DimensionPicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      headings: headingMapping,
    }
  }

  _changeGoalIds({checkValue}, changedGoal) {

    changedGoal.selected = checkValue

    let kpiIds = [];

    this.state.headings.forEach(h => {
        if(h.selected !== false) {
          kpiIds.push(h.ids)
        }
      })

    kpiIds = merge(kpiIds);

    this.props.onChange(kpiIds)

  }

  render() {

    return (
      <div className="dimension-picker">

        {this.state.headings.map((heading,i) => {
          return [
            <CheckBox
              key={ i }
              label={heading.name}
              id={heading.ids}
              className="checkbox"
              onIdChange={element => this._changeGoalIds(element, heading)}
            />
          ];
        })}

      </div>
    );
  }
}

export default DimensionPicker;
