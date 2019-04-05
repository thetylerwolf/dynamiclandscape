import goalsData from "../data_set/goals/all_goals_latest_years.json";
import wasteData from "../data_set/waste/all_waste_latest_years.json";
import integrationData from "../data_set/integration/all_integration_latest_years.json";
import energyData from "../data_set/energy/all_energy_latest_years.json";
import elderlyCareData from "../data_set/elderlyCare/all_elderlyCare_latest_years.json";

import wasteIdMapping from "../data_set/mapping/wasteIdMapping.json";
import integrationIdMapping from "../data_set/mapping/integrationIdMapping.json";
import goalIdMapping from "../data_set/mapping/goalIdMapping.json";
import energyIdMapping from "../data_set/mapping/energyIdMapping.json";
import elderlyCareIdMapping from "../data_set/mapping/elderlyCareIdMapping.json";

import municipalityIds from "../data_set/municipalityIdMapping.json";

const municipalities = Object.keys(municipalityIds).sort();

const d3 = require("d3");

const allData = [
  ...goalsData.kpis,
  ...wasteData.kpis,
  ...integrationData.kpis,
  ...energyData.kpis,
  ...elderlyCareData.kpis
];

const kpiMapping = {
  ...wasteIdMapping,
  ...integrationIdMapping,
  ...goalIdMapping,
  ...energyIdMapping,
  ...elderlyCareIdMapping
};

allData.forEach(d => {
  const vals = d.municipalities.map(d => d.value);
  const extent = d3.extent(vals);
  const mean = d3.mean(vals);
  const median = d3.median(vals);

  // Skip any duplicates (there are 5)
  if (kpiMapping[d.id].name) return;

  const name = kpiMapping[d.id];

  kpiMapping[d.id] = {
    name,
    max: extent[1],
    min: extent[0],
    mean,
    median
  };
});

console.log(kpiMapping);

const nodeData = municipalities.map(muniId => {
  return {
    kpis: allData.map(kpi => {
      return {
        ...(kpi.municipalities.find(m => m.id === muniId) || {}),
        id: kpi.id
      };
    }),
    id: muniId,
    active: true,
    name: municipalityIds[muniId]
  };
});

const modelData = nodeData.map(muni => {
  const kpiArr = muni.kpis.map(kpi => {
    const v = kpi.value === undefined ? -1 : kpi.value;

    return v;
  });

  return kpiArr;
});

export { municipalityIds, nodeData, modelData, kpiMapping, allData };
