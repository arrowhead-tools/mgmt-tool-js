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


function digestOschStoreData(orchStoreData) {
  const helperObject = {}
  for (const data of orchStoreData) {
    if (!helperObject[data.consumer.id]) {
      helperObject[data.consumer.id] = data.consumer
      data.consumer.lastUpdated = data.lastUpdated     
      data.consumer.instruction = data.instruction
      data.consumer.name = data.name
      data.providerSystem.priority = data.priority
      data.providerSystem.service = data.service
      data.providerSystem.cloud = data.providerCloud
      helperObject[data.consumer.id].providers = [data.providerSystem]
    } else {
      data.providerSystem.priority = data.priority
      data.consumer.lastUpdated = data.lastUpdated     
      data.consumer.instruction = data.instruction
      data.consumer.name = data.name
      data.providerSystem.priority = data.priority
      data.providerSystem.service = data.service
      data.providerSystem.cloud = data.providerCloud
      helperObject[data.consumer.id].providers.push(data.providerSystem)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })
  console.log(digested)
  return digested
}
function digestClouds(serviceData) {
  const helperObject = {}
  for (const data of serviceData) {
    helperObject[data.cloud.id] = data.cloud
    helperObject[data.cloud.id].clouds = [data.cloud]
  }
  return Object.values(helperObject)
}

function digestRelays(serviceData) {
  const helperObject = {}
  for (const data of serviceData) {
    helperObject[data.id] = data
    helperObject[data.id].relays = [data]
  }
  return Object.values(helperObject)
}


function digestOrchStatuses() {
  var tableData = [
    {providerId: "1", services: [
        {serviceId: "1", serviceDef: "Billing", systemId:"20", systemName:"SmartGridSystem2", localCloud:"Dummy7"},
        {serviceId: "2",serviceDef: "IndoorHumidity5", systemId: "10", systemName: "ChargingReserv", localCloud:"Dummy6"},
        {serviceId: "3", serviceDef:"IndoorHumidity7", systemId: "15", systemName: "ChargingReserv", localCloud:"Dummy5"},
        {serviceId: "4", serviceDef:"TestDef2", systemId: "4", systemName: "SomeSystem", localCloud:"Dummy4"},
        {serviceId: "1", serviceDef: "Billing2", systemId:"2", systemName:"SmartGridSystem28", localCloud:"Dummy3"},
        {serviceId: "2",serviceDef: "IndoorHumidity2", systemId: "100", systemName: "ChargingReserv7", localCloud:"Dummy2"},
        {serviceId: "3", serviceDef:"IndoorHumidity26", systemId: "19", systemName: "ChargingReserv22", localCloud:"Dummy1"},
        {serviceId: "4", serviceDef:"TestDef27", systemId: "18", systemName: "SomeSystem76", localCloud:"Dummy32"}
  ]},
  {providerId: "2", services: [
        {serviceId: "1", serviceDef: "Dummy", systemId:"20", systemName:"SmartGridSystem2", localCloud:"Dummy7"},
        {serviceId: "2",serviceDef: "Dummy2", systemId: "10", systemName: "ChargingReserv", localCloud:"Dummy6"},
        {serviceId: "3", serviceDef:"Dummy3", systemId: "15", systemName: "ChargingReserv", localCloud:"Dummy5"},
        {serviceId: "4", serviceDef:"Dummy4", systemId: "4", systemName: "SomeSystem", localCloud:"Dummy4"},
        {serviceId: "1", serviceDef: "Dummy5", systemId:"2", systemName:"SmartGridSystem28", localCloud:"Dummy3"},
        {serviceId: "2",serviceDef: "Dummy6", systemId: "100", systemName: "ChargingReserv7", localCloud:"Dummy2"},
        {serviceId: "3", serviceDef:"Dummy7", systemId: "19", systemName: "ChargingReserv22", localCloud:"Dummy1"},
        {serviceId: "4", serviceDef:"Dummy8", systemId: "18", systemName: "SomeSystem76", localCloud:"Dummy32"}
]},
  {providerId: "3", services: [
        {serviceId: "1", serviceDef: "Billing", systemId:"20", systemName:"SmartGridSystem2", localCloud:"Dummy7"},
        {serviceId: "2",serviceDef: "IndoorHumidity5", systemId: "10", systemName: "ChargingReserv", localCloud:"Dummy6"},
        {serviceId: "3", serviceDef:"IndoorHumidity7", systemId: "15", systemName: "ChargingReserv", localCloud:"Dummy5"},
        {serviceId: "4", serviceDef:"TestDef2", systemId: "4", systemName: "SomeSystem", localCloud:"Dummy4"},
        {serviceId: "1", serviceDef: "Billing2", systemId:"2", systemName:"SmartGridSystem28", localCloud:"Dummy3"},
        {serviceId: "2",serviceDef: "IndoorHumidity2", systemId: "100", systemName: "ChargingReserv7", localCloud:"Dummy2"},
        {serviceId: "3", serviceDef:"IndoorHumidity26", systemId: "19", systemName: "ChargingReserv22", localCloud:"Dummy1"},
        {serviceId: "4", serviceDef:"TestDef27", systemId: "18", systemName: "SomeSystem76", localCloud:"Dummy32"}
]},
  {providerId: "4", services: [
        {serviceId: "1", serviceDef: "Billing", systemId:"20", systemName:"SmartGridSystem2", localCloud:"Dummy7"},

]},
  {providerId: "7", services: [
        {serviceId: "3", serviceDef: "Billing", systemId:"20", systemName:"SmartGridSystem2", localCloud:"Dummy7"},
        {serviceId: "12", serviceDef: "Billing2", systemId:"20", systemName:"SmartGridSystem2", localCloud:"Dummy7"},
]}
] 
return tableData

}
export const services= {
  digestService: digestServices,
  digestCloud: digestClouds,
  digestRelay:digestRelays,
  digestOrchStatus: digestOrchStatuses,
  digestOrchStoreData: digestOschStoreData
}
