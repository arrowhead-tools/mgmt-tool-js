import _ from 'lodash'

export function groupInterCloudDataByClouds(interCloudData) {
  const helperObject = {}
  for (const data of interCloudData) {
    const service = { ...data.service, interCloudEntryId: data.id }
    if (!helperObject[data.cloud.id]) {
      helperObject[data.cloud.id] = {
        cloud: data.cloud,
        services: [service]
      }
    } else {
      helperObject[data.cloud.id].services.push(service)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })

  return digested
}

export function groupInterCloudDataByServices(interCloudData) {
  const helperObject = {}
  for (const data of interCloudData) {
    const cloud = { ...data.cloud, interCloudEntryId: data.id }
    if (!helperObject[data.service.id]) {
      helperObject[data.service.id] = {
        service: data.service,
        clouds: [cloud]
      }
    } else {
      helperObject[data.service.id].clouds.push(cloud)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })

  return digested
}
