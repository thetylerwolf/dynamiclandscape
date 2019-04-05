const goalsData = require("../data_set/goals/all_goals_latest_years.json");
const wasteData = require("../data_set/waste/all_waste_latest_years.json");
const integrationData = require("../data_set/integration/all_integration_latest_years.json");
const energyData = require("../data_set/energy/all_energy_latest_years.json");
const elderlyCareData = require("../data_set/elderlyCare/all_elderlyCare_latest_years.json");
const municipalityIds = require("../data_set/municipalityIdMapping.json");
const wasteIdMapping = require("../data_set/mapping/wasteIdMapping.json");
const integrationIdMapping = require("../data_set/mapping/integrationIdMapping.json");
const goalIdMapping = require("../data_set/mapping/goalIdMapping.json");
const energyIdMapping = require("../data_set/mapping/energyIdMapping.json");
const elderlyCareIdMapping = require("../data_set/mapping/elderlyCareIdMapping.json");

const municipalities = Object.keys(municipalityIds).sort();

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

console.log("ad", allData);

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

let modelData = nodeData.map(muni => {
  let kpiArr = muni.kpis.map(kpi => {
    let v = kpi.value === undefined ? -1 : kpi.value;

    return v;
  });

  return kpiArr;
});

export { municipalityIds, nodeData, modelData, kpiMapping };
