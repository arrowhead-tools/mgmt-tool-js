import _ from 'lodash'

export function groupEventHandlersByEventType(eventHandlerData) {
  const helperObject = {}
  for (const data of eventHandlerData) {
    const consumerData = {
      ...data.consumer,
      eventId: data.id,
      sources: data.sources,
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
