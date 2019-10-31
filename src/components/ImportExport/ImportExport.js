/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2019. 10. 29.
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CloudUpload from '@material-ui/icons/CloudUpload'
import CloudDownload from '@material-ui/icons/CloudDownload'
import ListItemText from '@material-ui/core/ListItemText'
import Files from 'react-files'
import { createSystem, addSREntry, getServices, getSystems, getServiceRegistryEntries, deleteService, deleteSystem, deleteServiceRegistryEntry } from '../../actions/serviceRegistry'
import { addAuthData, getIntraCloudAuthData } from '../../actions/auth'
import fileDownload from 'js-file-download'


class ImportExport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jsonFile: {},
      systems: [],
      entries: [],
      consumers: [],
      authRules: []
    }

    this.fileReader = new FileReader()
    this.fileReader.onload = event => {
      const upload = JSON.parse(event.target.result)
      this.setState({jsonFile: upload, systems: upload.systems, entries: upload.serviceRegistryEntries, authRules: upload.authRules, consumers: upload.consumption}, () => {
        // console.log(this.state.jsonFile)

        /*new Promise(resolve => {
          this.props.getServiceRegistryEntries(resolve)
        }).then(result => {
          return new Promise(resolve => {
            this.props.entries.data.reduce((promiseChain, entry) => {
              return promiseChain.then(() => new Promise((resolve) => {
                this.props.deleteServiceRegistryEntry(entry.id, resolve)
              }))
            }, resolve())
          })
        }).then(resolve => {
        return new Promise(resolve => {
          this.props.getSystems(resolve)
          })
        }).then(result => {
          return new Promise(resolve => {
            this.props.systems.reduce((promiseChain, system) => {
              return promiseChain.then(() => new Promise((resolve) => {
                this.props.deleteSystem(system.id, resolve)
              }))
            }, Promise.resolve())
          })
        }).then(result => {
          return new Promise(resolve => {
            this.props.getServices(resolve)
          })
        }).then(result => {
          return new Promise(resolve => {
            this.props.services.reduce((promiseChain, service) => {
              return promiseChain.then(() => new Promise((resolve) => {
                this.props.deleteService(service.id, resolve)
              }))
            }, Promise.resolve())
          })
        })*/

         this.importSystems(this.state.systems)
          .then(result => this.importServiceRegistryEntries(this.state.entries))
          .then(result => {
            return new Promise(resolve => {
              this.props.getSystems(resolve)
            })
          })
          .then(result => {
            return new Promise(resolve => {
              this.props.getServices(resolve)
            })
          })
          .then(result => this.importAuthRules(this.state.authRules, this.props.autoCompleteData.interfaceList, this.props.systems, this.props.services))
      })
    }
  }

  importSystems = (systems) => {
    return systems.reduce((promiseChain, system) => {
      return promiseChain.then(() => new Promise((resolve) => {
        this.props.createSystem(system, resolve)
      }))
    }, Promise.resolve())
  }

  importServiceRegistryEntries = (entries) => {
   return entries.reduce((promiseChain, entry) => {
     entry.providerSystem = entry.provider
     delete entry.provider
     return promiseChain.then(() => new Promise((resolve) => {
       this.props.addSREntry(entry, resolve)
     }))
   }, Promise.resolve())
  }

  importAuthRules = (rules, interfaceList, systemList, serviceList) => {

    const rulesToSubmit = []
    for(const rule of rules){
      const authData = {
        consumerSystem: systemList.filter(system => {
          return system.systemName === rule.consumer})[0],
        service: serviceList.filter(service => {
          return service.serviceDefinition === rule.serviceDefinition
        })[0],
        interfaces: interfaceList.filter(iface => rule.interfaces.includes(iface.value)),
        providerList: systemList.filter(system => rule.providers.includes(system.systemName))
      }

      rulesToSubmit.push(authData)
    }

    return rulesToSubmit.reduce((promiseChain, rule) => {
      return promiseChain.then(() => new Promise((resolve) => {
        this.props.addAuthData(rule.consumerSystem, rule.providerList, rule.service, rule.interfaces, resolve)
      }))
    }, Promise.resolve())
  }

  onExportClick = () => {
    const result = new Promise(resolve => {
      this.props.getSystems(resolve)
    })
      .then(result => {
        return new Promise(resolve => {
          this.props.getServiceRegistryEntries(resolve)
        })
      })
      .then(result => {
        return new Promise(resolve => {
          this.props.getIntraCloudAuthData(resolve)
        })
      })
      .then(result => {
        const authRulesHelperArray = this.props.authRules.map(({ consumerSystem, providerSystem, interfaces, serviceDefinition}) => {
          return {
            providers: providerSystem.systemName,
            consumer: consumerSystem.systemName,
            interfaces: interfaces.map(i => i.interfaceName),
            serviceDefinition: serviceDefinition.serviceDefinition
          }
        })

        const authRulesHelperObject = {}
        authRulesHelperArray.map(rule => {
          if(!authRulesHelperObject[rule.consumer+rule.interfaces.join()+rule.serviceDefinition]){
            authRulesHelperObject[rule.consumer+rule.interfaces.join()+rule.serviceDefinition] = {
              ...rule,
              providers: [rule.providers]
            }
          } else {
            authRulesHelperObject[rule.consumer+rule.interfaces.join()+rule.serviceDefinition].providers.push(rule.providers)
          }
        })

        const exportObject = {
          systems: this.props.systems.map(({id, createdAt, updatedAt, ...rest }) => rest),
          serviceRegistryEntries: this.props.entries.data.map(entry => {
            delete entry.id
            delete entry.createdAt
            delete entry.updatedAt
            delete entry.provider.id
            entry.serviceDefinition = entry.serviceDefinition.serviceDefinition
            delete entry.provider.createdAt
            delete entry.provider.updatedAt
            entry.interfaces = entry.interfaces.map(iface => iface.interfaceName)
            return entry
          }),
          consumption: [],
          authRules: Object.values(authRulesHelperObject)
        }


        fileDownload(JSON.stringify(exportObject, null, 3), 'export.json')
      })
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.importExport}>
        <List className={classes.list}>
          <ListItem
            button
            className={classes.itemLink}
          >
            <ListItemIcon className={classes.itemIcon}>
              <CloudUpload/>
            </ListItemIcon>
            <Files
              className={classes.itemText}
              onChange={file => {
                this.fileReader.readAsText(file[0])
              }}
              onError={err => console.log(err)}
              accepts={['.json']}
              multiple={false}
              maxFileSize={10000000}
              minFileSize={0}
              clickable>
              <div style={{paddingLeft: '16px', paddingRight: '116px'}}>
                Import
              </div>
            </Files>
          </ListItem>
          <ListItem
            button
            onClick={this.onExportClick}
            className={classes.itemLink}
          >
            <ListItemIcon className={classes.itemIcon}>
              <CloudDownload/>
            </ListItemIcon>
            <ListItemText
              primary="Export"
              className={classes.itemText}
              disableTypography
            />
          </ListItem>
        </List>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { services, auth } = state
  return { autoCompleteData: services.autoCompleteData, systems: services.systems, services: services.services, entries: services.entries, authRules: auth.authRules }
}

function mapDispatchToProps(dispatch) {
  return {
    createSystem: (data, cb) => {
      dispatch(createSystem(data, cb))
    },
    addSREntry: (entries, cb) => {
      dispatch(addSREntry(entries, cb))
    },
    getServices: (cb) => {
      dispatch(getServices(cb))
    },
    getSystems: (cb) => {
      dispatch(getSystems(cb))
    },
    getServiceRegistryEntries: (cb) => {
      dispatch(getServiceRegistryEntries(cb))
    },
    getIntraCloudAuthData: (cb) => {
      dispatch(getIntraCloudAuthData(cb))
    },
    deleteService: (serviceId, cb) => {
      dispatch(deleteService(serviceId, cb))
    },
    deleteSystem: (systemId, cb) => {
      dispatch(deleteSystem(systemId, cb))
    },
    deleteServiceRegistryEntry: (entryId, cb) => {
      dispatch(deleteServiceRegistryEntry(entryId, cb))
    },
    addAuthData: (consumer, provider, service, interfaces, cb) => {
      dispatch(addAuthData(consumer, provider, service, interfaces, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportExport)