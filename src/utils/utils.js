import _ from 'lodash'
import matchSorter from 'match-sorter'

export function groupServicesBySystems(serviceData) {
  const helperObject = {}
  for (const data of serviceData.serviceQueryData) {
    const providedService = data.providedService
    providedService.serviceId = data.id
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
      const providerData = {
        ...data.provider,
        interface: iface,
        serviceURI: data.serviceURI,
        udp: data.udp || '',
        serviceId: data.id,
        version: data.version
      }
      if (!helperObject[data.providedService.serviceDefinition]) {
        helperObject[data.providedService.serviceDefinition] = {
          serviceDefinition: data.providedService.serviceDefinition,
          interface: iface,
          provider: [providerData],
          serviceURI: data.serviceURI,
          serviceId: data.id,
          udp: data.udp || '',
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
      provider: data.provider,
      service: data.service
    }

    if (!helperObject[data.consumer.id]) {
      helperObject[data.consumer.id] = {
        consumer: data.consumer,
        relation: [relationData]
      }
    } else {
      helperObject[data.consumer.id].relation.push(relationData)
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
      consumer: data.consumer,
      service: data.service
    }

    if (!helperObject[data.provider.id]) {
      helperObject[data.provider.id] = {
        provider: data.provider,
        relation: [relationData]
      }
    } else {
      helperObject[data.provider.id].relation.push(relationData)
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
      service: data.service,
      consumer: data.consumer,
      provider: data.provider
    }

    if (!helperObject[data.service.id]) {
      helperObject[data.service.id] = {
        service: data.service,
        relation: [relationData]
      }
    } else {
      helperObject[data.service.id].relation.push(relationData)
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
    if (!helperObject[data.consumer.id]) {
      helperObject[data.consumer.id] = {
        consumerData: { ...data.consumer },
        consumedServices: {
          [data.service.id]: {
            service: data.service,
            providers: [providerSystem]
          }
        }
      }
    } else {
      if (!helperObject[data.consumer.id].consumedServices[data.service.id]) {
        helperObject[data.consumer.id].consumedServices[data.service.id] = {
          service: data.service,
          providers: [providerSystem]
        }
      } else {
        helperObject[data.consumer.id].consumedServices[
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
