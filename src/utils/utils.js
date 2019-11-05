import _ from 'lodash'
import matchSorter from 'match-sorter'

export function groupServicesBySystems(serviceData) {
  const helperObject = {}

  for (const data of serviceData.serviceQueryData) {
    const providedService = {
      ...data.providedService,
      entry: data,
      udp: data.udp ? '✓' : '✗',
      serviceURI: data.serviceURI
    }
    if (!helperObject[data.provider.id]) {
      helperObject[data.provider.id] = { ...data.provider }
      helperObject[data.provider.id].services = [providedService]
    } else {
      helperObject[data.provider.id].services.push(providedService)
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
      const providerData = {
        ...data.provider,
        interface: iface,
        serviceURI: data.serviceURI,
        udp: data.udp ? '✓' : '✗',
        serviceId: data.id,
        version: data.version,
        entry: data
      }
      if (!helperObject[data.providedService.serviceDefinition]) {
        helperObject[data.providedService.serviceDefinition] = {
          serviceDefinition: data.providedService.serviceDefinition,
          interface: iface,
          provider: [providerData],
          serviceURI: data.serviceURI,
          serviceId: data.id,
          udp: data.udp ? '✓' : '✗',
          version: data.version
        }
      } else {
        helperObject[data.providedService.serviceDefinition].provider.push(
          providerData
        )
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
      serviceListHelper[data.providedService.serviceDefinition] = {
        value: data.providedService.serviceDefinition
      }
    }

    for (const iface of data.providedService.interfaces) {
      if (!interfaceListHelper[iface]) {
        interfaceListHelper[iface] = { value: iface }
      }
    }

    if (!systemListHelper[data.provider.systemName]) {
      systemListHelper[data.provider.systemName] = data.provider
    }
  }
  _.forEach(interfaceListHelper, v => {
    v.id = interfaceList.length
    interfaceList.push(v)
  })

  _.forEach(systemListHelper, v => {
    systemList.push(v)
  })

  _.forEach(serviceListHelper, v => {
    v.id = serviceList.length
    serviceList.push(v)
  })
  return { serviceList, systemList, interfaceList }
}

export function filterItems(data, filter, key) {
  return filter
    ? matchSorter(data, filter, {
        keys: [key]
      })
    : data
}

export function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (_.get(b, orderBy) < _.get(a, orderBy) ? -1 : 1)
    : (a, b) => (_.get(a, orderBy) < _.get(b, orderBy) ? -1 : 1)
}

export function groupAuthDataByConsumer(authData) {
  const helperObject = {}
  for (const data of authData) {
    const relationData = {
      authEntryId: data.id,
      provider: data.providerSystem,
      service: data.serviceDefinition,
      interfaces: data.interfaces
    }

    if (!helperObject[data.consumerSystem.id]) {
      helperObject[data.consumerSystem.id] = {
        consumer: data.consumerSystem,
        relation: [relationData]
      }
    } else {
      helperObject[data.consumerSystem.id].relation.push(relationData)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })

  return digested
}

export function groupAuthDataByProvider(authData) {
  const helperObject = {}
  for (const data of authData) {
    const relationData = {
      authEntryId: data.id,
      consumer: data.consumerSystem,
      service: data.serviceDefinition,
      interfaces: data.interfaces
    }

    if (!helperObject[data.providerSystem.id]) {
      helperObject[data.providerSystem.id] = {
        provider: data.providerSystem,
        relation: [relationData]
      }
    } else {
      helperObject[data.providerSystem.id].relation.push(relationData)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })

  return digested
}

export function groupAuthDataByService(authData) {
  const helperObject = {}
  for (const data of authData) {
    const relationData = {
      authEntryId: data.id,
      service: data.serviceDefinition,
      consumer: data.consumerSystem,
      provider: data.providerSystem,
      interfaces: data.interfaces
    }

    if (!helperObject[data.serviceDefinition.id]) {
      helperObject[data.serviceDefinition.id] = {
        service: data.serviceDefinition,
        relation: [relationData]
      }
    } else {
      helperObject[data.serviceDefinition.id].relation.push(relationData)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })

  return digested
}

export function digestOrchestrationBackupListData(orchestrationData) {
  const helperObject = {}
  for (const data of orchestrationData) {
    const providerSystem = {
      ...data.providerSystem,
      priority: data.priority,
      storeEntryId: data.id,
      storeEntry: data
    }
    if (!helperObject[data.consumerSystem.id]) {
      helperObject[data.consumerSystem.id] = {
        consumerData: { ...data.consumerSystem },
        consumedServices: {
          [data.service.id]: {
            service: data.service,
            providers: [providerSystem]
          }
        }
      }
    } else {
      if (!helperObject[data.consumerSystem.id].consumedServices[data.service.id]) {
        helperObject[data.consumerSystem.id].consumedServices[data.service.id] = {
          service: data.service,
          providers: [providerSystem]
        }
      } else {
        helperObject[data.consumerSystem.id].consumedServices[
          data.service.id
        ].providers.push(providerSystem)
      }
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    const tmp = []
    _.forEach(v.consumedServices, (value, key) => {
      tmp.push(value)
    })
    v.consumedServices = tmp
    digested.push(v)
  })

  return digested
}
