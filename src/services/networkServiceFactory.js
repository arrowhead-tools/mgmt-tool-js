import axios from 'axios'

class NetworkServiceFactory {
    constructor() {
        this.initialized = false
        this.queue = []

        axios.get("/config.json").then(
            response => {
                this.env = response.data
                this.initialized = true
                this.queue.forEach(f => f(null))
                delete this.queue
            },
            error => {
                this.env = {}
                this.initialized = true
                this.queue.forEach(f => f(error))
                delete this.queue
                console.log(error)
            }
        )
    }

    createWithBaseURLFromEnv(variableName) {
        if (this.initialized) {
            return Promise.resolve(create_(this.env[variableName]))
        } else {
            return new Promise((resolve, reject) => {
                this.queue.push((error) => {
                    if (error == null) {
                        resolve(create_(this.env[variableName]))
                    } else {
                        reject(error)
                    }
                });
            })
        }

        function create_(baseURL) {
            return axios.create({baseURL, timeout: 10000})
        }
    }
}

const factory = new NetworkServiceFactory()
export default factory
