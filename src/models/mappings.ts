import * as d3 from 'd3';

import goalsData from "../data_set/goals/all_goals_latest_years.json";

import goalIdMapping from "../data_set/mapping/goalIdMapping.json";

import municipalityIds from "../data_set/municipalityIdMapping.json";

import nodes from "../data_set/un_data_nodes.json"

interface dimension {
  name: string
  max: number | undefined
  min: number | undefined
  mean: number | undefined
  median: number | undefined
  index: number
}

interface node {
  dimensions: any[]
  id: string
  active: boolean
  name: string
}

const dimensions: { [key: string]: dimension } = {}

console.log('nodes', nodes)
const municipalities = Object.entries(municipalityIds).sort();

const allData = [
  ...goalsData.kpis
];

const kpiMapping: { [key: string]: any } = {
  ...goalIdMapping
};

allData.forEach((d, i) => {
  const vals = d.municipalities.map(d => d.value);
  const extent = d3.extent(vals);
  const mean = d3.mean(vals);
  const median = d3.median(vals);

  // Skip any duplicates (there are 5)
  if (dimensions[d.id]) return;

  const name: string = kpiMapping[d.id]

  dimensions[d.id] = {
    name,
    max: extent[1],
    min: extent[0],
    mean,
    median,
    index: i
  };
});

const nodeData: node[] = municipalities.map(([ muniId, muniName]: [string, string]) => {
  return {
    dimensions: allData.map(kpi => {
      return {
        ...(kpi.municipalities.find(m => m.id === muniId) || {}),
        id: kpi.id
      };
    }),
    id: muniId,
    active: true,
    name: muniName,
  };
});

const modelData: number[][] = nodeData.map(node => {
  const dimensionArr = node.dimensions.map(dimension => {
    const v = dimension.value === undefined ? -1 : dimension.value;

    return v;
  });

  return dimensionArr;
});

console.log(nodeData, modelData, dimensions, municipalityIds)

export { municipalityIds, nodeData, modelData, dimensions };
