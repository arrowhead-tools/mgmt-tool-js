import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_ARROWHEAD_EH_URL}`,
  timeout: 10000
})

export default instance
