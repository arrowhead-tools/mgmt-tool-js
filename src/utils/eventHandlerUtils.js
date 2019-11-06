import _ from 'lodash'

export function groupEventHandlersByEventType(eventHandlerData) {
  const helperObject = {}
  for (const data of eventHandlerData) {
    const sourceSystemNames = data.sources.filter(system => system.systemName)

    const consumerData = {
      ...data.subscriberSystem,
      eventId: data.id,
      sources: sourceSystemNames,
      filterMetadata: data.filterMetadata,
      notifyUri: data.notifyUri,
      matchMetadata: data.matchMetadata,
      event: data
    }

    if (!helperObject[data.eventType]) {
      helperObject[data.eventType] = {
        eventType: data.eventType,
        consumers: [consumerData]
      }
    } else {
      helperObject[data.eventType].consumers.push(consumerData)
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push(v)
  })

  return digested
}

export function getEventNames(eventHandlerData) {
  const helperObject = {}
  for (const data of eventHandlerData) {
    if (!helperObject[data.eventType]) {
      helperObject[data.eventType] = data.eventType
    }
  }

  const digested = []
  _.forEach(helperObject, (v, k) => {
    digested.push({ eventType: v })
  })

  return digested
}
