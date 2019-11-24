import dimGroupingJson from "../data_set/un_data_dimension_grouping.json";
import { merge } from "d3-array";

export const dimGroupings = dimGroupingJson.map((group) => {
	return {
		...group,
		selected: true
	}
})

export const groupingKey = grouping => {
	return Object.keys(grouping)[0]
}

export const selectedKpis = groupings => {
	let kpiIds = []
	groupings.forEach(group => {
		if (group.selected === true) {
			kpiIds.push(group[groupingKey(group)])
		}
	})
	return merge(kpiIds)
}