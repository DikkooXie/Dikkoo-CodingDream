import axios from 'axios'

const baseURL = '/api/'

export function get (url) {  // /login
  return function(params = {}) {
    return axios.get(baseURL + url, { params })
      .then(res => {
        const { errno, data } = res.data
        if (errno === 0) {
          return data
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}