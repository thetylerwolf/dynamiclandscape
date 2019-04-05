import goalsData from '../data_set/goals/all_goals_latest_years.json'
import municipalityIds from '../data_set/municipalityIdMapping.json'


const municipalities = Object.keys(municipalityIds).sort()

const nodeData = municipalities.map(muniId => {

  return {
    kpis: goalsData.kpis.map(kpi => {
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
