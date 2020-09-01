import * as d3 from 'd3';

// import goalsData from "../data_set/goals/all_goals_latest_years.json";

// import goalIdMapping from "../data_set/mapping/goalIdMapping.json";

// import municipalityIds from "../data_set/municipalityIdMapping.json";

import nodes from "../data_set/un_data_nodes.json"
import allDimensions from "../data_set/un_data_dimension_grouping.json"

export interface Idimension {
  name: string
  max: number | undefined
  min: number | undefined
  mean: number | undefined
  median: number | undefined
  index: number
}

export interface InodeDimension {
  dimension: string
  value: string
}

export interface Inode {
  dimensions: InodeDimension[]
  active?: boolean
  name: string
  color?: string
  selected?: boolean
}

const nodeData: any[] = nodes

const flatDimensions: string[] = <string[]>( allDimensions.flatMap(d => {
  const dims = Object.values(d)
  return dims[0]
}) )

const dimensions: { [key: string]: Idimension } = {}

console.log('nodeData', nodeData)

flatDimensions.forEach((dim, i) => {

  const vals: number[] = <number[]>( nodeData.map((node: any) => {
    const foundDim: InodeDimension | undefined = node.dimensions.find((d: InodeDimension) => d.dimension === dim)
    return (foundDim && (foundDim.value !== null)) ? +foundDim.value : null
  }).filter(v => v !== null) )

  const extent = d3.extent(vals)
  const mean = d3.mean(vals)
  const median = d3.median(vals)

  // Skip any duplicates (there are 5)
  if (dimensions[dim]) return;

  dimensions[dim] = {
    name,
    max: extent[1],
    min: extent[0],
    mean,
    median,
    index: i
  };
});

const modelData: number[][] = nodeData.map(node => {
  const dimensionArr = node.dimensions.map((dimension: InodeDimension) => {
    const v = dimension.value === null ? -1 : +dimension.value;

    return v;
  });

  return dimensionArr;
});

export { nodeData, modelData, dimensions };
