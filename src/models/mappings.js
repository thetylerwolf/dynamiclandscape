import goalsData from '../data_set/goals/all_goals_latest_years.json'
import wasteData from '../data_set/waste/all_waste_latest_years.json'
import integrationData from '../data_set/integration/all_integration_latest_years.json'
import energyData from '../data_set/energy/all_energy_latest_years.json'
import elderlyCareData from '../data_set/elderlyCare/all_elderlyCare_latest_years.json'
import municipalityIds from '../data_set/municipalityIdMapping.json'


const municipalities = Object.keys(municipalityIds).sort()

const allData = [
  ...goalsData.kpis,
  ...wasteData.kpis,
  ...integrationData.kpis,
  ...energyData.kpis,
  ...elderlyCareData.kpis
]

console.log('ad', allData)

const nodeData = municipalities.map(muniId => {

  return {
    kpis: allData.map(kpi => {
      return {
        ...(kpi.municipalities.find(m => m.id == muniId) || {}),
        id: kpi.id
      }
    }),
    id: muniId,
    active: true,
    name: municipalityIds[ muniId ]
  }

})

let modelData = nodeData.map(muni => {

  let kpiArr = muni.kpis.map(kpi => {

    let v = kpi.value === undefined ? -1 : kpi.value

    return v
  })

  return kpiArr

})



export {
  municipalityIds,
  nodeData,
  modelData,
}
