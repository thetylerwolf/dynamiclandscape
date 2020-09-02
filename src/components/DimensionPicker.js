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
				<div>
					<p style={{ fontWeight: 'bold', fontSize: 20 }}>Dynamic Landscape</p>
					<p>This app runs a machine learning algorithm <a href="https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding">known as T-SNE</a> to visually group Sweden's municipalities based on over 50 criteria associated with the UN sustainable development goals. The animation you see is the algorithm analyzing the data in real time.</p>
					<p><strong>Click</strong> a bubble for more detail about the municipality. <strong>Click away</strong> from the municipality to remove focus. <strong>Scrolling your mouse</strong> to zoom in and out. <strong>Click and drag</strong> to pan the visualization.</p>
					<p>Use the dropdowns on the legend in the bottom-right corner to change what criteria influence the size and color of each bubble in the visualization.</p>
					<p>Criteria can be removed from the grouping algorithm by turning them on and off below. Turning a goal off will disable its associated criteria.</p>
				</div>

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

				<br/>
				<br/>
				<div>
					<p><strong>Created by:</strong></p>
					<p><a href="https://twitter.com/tylernwolf" target="_blank">Tyler Wolf</a></p>
					<p><a href="https://www.linkedin.com/in/adam-ekberg-26a376a0/" target="_blank">Adam Ekberg</a></p>
					<p><a href="https://www.linkedin.com/in/karlantonbrotmark/" target="_blank">Karl-Anton Brötmark</a></p>
				</div>

			</div>
		);
	}
}

export default DimensionPicker;
