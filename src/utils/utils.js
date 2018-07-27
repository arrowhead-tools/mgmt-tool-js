import _ from 'lodash'

function digestServices(serviceData) {
  const helperObject = {}
  for (const data of serviceData.serviceQueryData) {
    if (!helperObject[data.provider.id]) {
      helperObject[data.provider.id] = data.provider
      data.providedService.port = data.port
      data.providedService.serviceURI = data.serviceURI
      data.providedService.version = data.version
      data.providedService.udp = data.udp.toString()
      data.providedService.ttl = data.ttl
      helperObject[data.provider.id].services = [data.providedService]
    } else {
      data.providedService.port = data.port
      data.providedService.serviceURI = data.serviceURI
      data.providedService.version = data.version
      data.providedService.udp = data.udp.toString()
      data.providedService.ttl = data.ttl
      helperObject[data.provider.id].services.push(data.providedService)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })
  return digested
}

function digestClouds(serviceData) {
  const helperObject = {}
  for (const data of serviceData) {
    helperObject[data.cloud.id] = data.cloud
    helperObject[data.cloud.id].clouds = [data.cloud]
  }
  console.log(Object.values(helperObject))

  return Object.values(helperObject)
}

function digestBrokers(serviceData) {
  const helperObject = {}
  for (const data of serviceData) {
    helperObject[data.id] = data
    helperObject[data.id].brokers = [data]
  }
  console.log(Object.values(helperObject))
  return Object.values(helperObject)
}
export const services= {
  digestService: digestServices,
  digestCloud: digestClouds,
  digestBroker:digestBrokers
}
