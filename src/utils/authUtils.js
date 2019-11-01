import _ from 'lodash'

export function groupInterCloudDataByClouds(interCloudData) {
  const helperObject = {}
  for (const {id, cloud, serviceDefinition, provider, interfaces} of interCloudData) {
    const service = {
      interCloudEntryId: id,
      service: {
        ...serviceDefinition,
        provider : {
          ...provider,
          interfaces
        }
      }
    }
    if (!helperObject[cloud.id]) {
      helperObject[cloud.id] = {
        cloud,
        services: [service]
      }
    } else {
      helperObject[cloud.id].services.push(service)
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
  for (const {id, cloud, serviceDefinition, provider, interfaces} of interCloudData) {
    const cloudData = {
      interCloudEntryId: id,
      cloud: {
        ...cloud,
        provider: {
          ...provider,
          interfaces
        }
      }
    }
    if (!helperObject[serviceDefinition.id]) {
      helperObject[serviceDefinition.id] = {
        service: serviceDefinition,
        clouds: [cloudData]
      }
    } else {
      helperObject[serviceDefinition.id].clouds.push(cloudData)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })

  return digested
}
