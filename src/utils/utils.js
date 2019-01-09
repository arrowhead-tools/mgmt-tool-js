import _ from 'lodash'

export function groupServicesBySystems(serviceData) {
  const helperObject = {}
  for (const data of serviceData.serviceQueryData) {
    if (!helperObject[data.provider.id]) {
      helperObject[data.provider.id] = data.provider
      data.providedService.port = data.port
      data.providedService.serviceURI = data.serviceURI
      data.providedService.version = data.version
      data.providedService.udp = data.udp ? data.udp.toString() : ''
      data.providedService.ttl = data.ttl
      helperObject[data.provider.id].services = [data.providedService]
    } else {
      data.providedService.port = data.port
      data.providedService.serviceURI = data.serviceURI
      data.providedService.version = data.version
      data.providedService.udp = data.udp ? data.udp.toString() : ''
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

export function groupServicesByServices(serviceData) {
  const helperObject = {}
  for (const data of serviceData.serviceQueryData) {
    for (const iface of data.providedService.interfaces) {
      const providerData = data.provider
      providerData.interface = iface
      providerData.serviceURI = data.serviceURI
      providerData.udp = data.udp || ''
      providerData.serviceId = data.id
      providerData.version = data.version
      if (!helperObject[data.providedService.serviceDefinition + iface]) {
        helperObject[data.providedService.serviceDefinition + iface] = {
          serviceDefinition: data.providedService.serviceDefinition,
          interface: iface,
          provider: [providerData],
          serviceURI: data.serviceURI,
          serviceId: data.id,
          udp: data.udp || '',
          version: data.version
        }
      } else {
        helperObject[data.providedService.serviceDefinition + iface].provider.push(providerData)
      }
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })
  return digested
}

export function getAutoCompleteData(serviceData) {
  const serviceListHelper = {}
  const serviceList = []
  const systemListHelper = {}
  const systemList = []
  const interfaceListHelper = {}
  const interfaceList = []

  for (const data of serviceData.serviceQueryData) {
    if (!serviceListHelper[data.providedService.serviceDefinition]) {
      serviceListHelper[data.providedService.serviceDefinition] = {value: data.providedService.serviceDefinition}
    }

    for (const iface of data.providedService.interfaces) {
      if (!interfaceListHelper[iface]) {
        interfaceListHelper[iface] = {value: iface}
      }
    }

    if (!systemListHelper[data.provider.systemName]) {
      systemListHelper[data.provider.systemName] = data.provider
    }
  }
  _.forEach(interfaceListHelper, (v) => {
    v.id = interfaceList.length
    interfaceList.push(v)
  })

  _.forEach(systemListHelper, (v) => {
    systemList.push(v)
  })

  _.forEach(serviceListHelper, (v) => {
    v.id = serviceList.length
    serviceList.push(v)
  })
  return { serviceList, systemList, interfaceList }
}

function digestOrchStoreData(orchStoreData) {
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
  return [
    {
      providerId: '11',
      services: [
        { serviceId: '1', serviceDef: 'Billing', systemId: '20', systemName: 'Gatekeeper', localCloud: 'Dummy7' },
        {
          serviceId: '2',
          serviceDef: 'IndoorHumidity5',
          systemId: '10',
          systemName: 'Authorizator',
          localCloud: 'Dummy6'
        },
        {
          serviceId: '3',
          serviceDef: 'IndoorHumidity7',
          systemId: '15',
          systemName: 'ChargingReserv',
          localCloud: 'Dummy5'
        },
        { serviceId: '4', serviceDef: 'TestDef2', systemId: '4', systemName: 'SomeSystem', localCloud: 'Dummy4' },
        {
          serviceId: '5',
          serviceDef: 'IndoorHumidity26',
          systemId: '19',
          systemName: 'ChargingReserv22',
          localCloud: 'Dummy1'
        },
        { serviceId: '6', serviceDef: 'TestDef27', systemId: '18', systemName: 'SomeSystem76', localCloud: 'Dummy32' }
      ]
    },
    {
      providerId: '4',
      services: [
        { serviceId: '1', serviceDef: 'Dummy', systemId: '20', systemName: 'SmartGridSystem2', localCloud: 'Dummy7' },
        { serviceId: '2', serviceDef: 'Dummy2', systemId: '10', systemName: 'ChargingReserv', localCloud: 'Dummy6' },
        { serviceId: '3', serviceDef: 'Dummy3', systemId: '15', systemName: 'Orchestrator', localCloud: 'Dummy5' },
        { serviceId: '4', serviceDef: '4', systemId: '4', systemName: 'SomeSystem', localCloud: 'Dummy4' },
        { serviceId: '5', serviceDef: 'Dummy5', systemId: '2', systemName: 'SmartGridSystem28', localCloud: 'Dummy3' },
        { serviceId: '6', serviceDef: 'Dummy6', systemId: '100', systemName: 'ChargingReserv7', localCloud: 'Dummy2' },
        { serviceId: '7', serviceDef: 'Dummy7', systemId: '19', systemName: 'ChargingReserv22', localCloud: 'Dummy1' },
        { serviceId: '8', serviceDef: 'Dummy8', systemId: '18', systemName: 'SomeSystem76', localCloud: 'Dummy32' }
      ]
    },
    {
      providerId: '1',
      services: [
        { serviceId: '1', serviceDef: 'Billing', systemId: '20', systemName: 'SmartGridSystem2', localCloud: 'Dummy7' },
        {
          serviceId: '2',
          serviceDef: 'IndoorHumidity5',
          systemId: '10',
          systemName: 'ChargingReserv',
          localCloud: 'Dummy6'
        },
        {
          serviceId: '3',
          serviceDef: 'IndoorHumidity7',
          systemId: '15',
          systemName: 'ChargingReserv',
          localCloud: 'Dummy5'
        },
        { serviceId: '5', serviceDef: 'Billing2', systemId: '2', systemName: 'Orchestrator', localCloud: 'Dummy3' },
        {
          serviceId: '67',
          serviceDef: 'IndoorHumidity2',
          systemId: '100',
          systemName: 'ChargingReserv7',
          localCloud: 'Dummy2'
        },
        { serviceId: '100', serviceDef: 'TestDef27', systemId: '18', systemName: 'SomeSystem76', localCloud: 'Dummy32' }
      ]
    },
    {
      providerId: '3',
      services: [
        { serviceId: '1', serviceDef: 'Billing', systemId: '20', systemName: 'SmartGridSystem2', localCloud: 'Dummy7' }

      ]
    },
    {
      providerId: '2',
      services: [
        { serviceId: '3', serviceDef: 'Billing', systemId: '20', systemName: 'SmartGridSystem2', localCloud: 'Dummy7' },
        {
          serviceId: '12',
          serviceDef: 'Billing2',
          systemId: '20',
          systemName: 'SmartGridSystem2',
          localCloud: 'Dummy7'
        }
      ]
    }
  ]
}

export const services = {
  digestService: groupServicesBySystems,
  digestCloud: digestClouds,
  digestRelay: digestRelays,
  digestOrchStatus: digestOrchStatuses,
  digestOrchStoreData: digestOrchStoreData
}
