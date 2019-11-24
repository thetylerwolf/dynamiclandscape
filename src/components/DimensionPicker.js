import React, { Component } from "react";
import { dimGroupings, groupingKey, selectedKpis } from "../util/dimensionGroupingUtil";
import CheckBox from './CheckBox';
import _ from 'lodash'

class DimensionPicker extends Component {

	constructor(props) {
		super(props)

		this.state = {
			groupings: dimGroupings,
		}
	}

	_changeGoalIds({ checkValue }, changedGoal) {
		changedGoal.selected = checkValue
		this.props.onChange(selectedKpis(this.state.groupings))
	}

	render() {

		return (
			<div className="dimension-picker">

				{this.state.groupings.map((group, i) => {
					let label = groupingKey(group)
					return [
						<CheckBox
							key={i}
							label={label}
							id={group[label]}
							className="checkbox"
							onIdChange={element => this._changeGoalIds(element, group)}
						/>
					];
				})}

			</div>
		);
	}
}

export default DimensionPicker;
