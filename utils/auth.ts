// @ts-nocheck
import { getJwtToken, getJwtRefreshToken, saveJwtToken, saveJwtRefreshToken, saveJwtTokenExpiry } from './jwt-storage-ss'
let includeApiTypeIdentifier = false
let apiTypeIdentifier = ''
const apiTypeLabel = 'SAFF-Type-Identifier'
const GET_TOKEN_URL = '/api/auth/token'
const RENEW_TOKEN_URL = '/api/auth/token/renew'
const INIT_URL = '/api/config/init'
function setApiTypeIdentifier (include = true) {
  includeApiTypeIdentifier = include
}

async function getApiTypeIdentifier (configUrl) {
  return new Promise(async (resolve, reject) => {
    if (apiTypeIdentifier.length === 0) {
      fetchWithTimeout(configUrl, {
        method: 'GET'
      })
        .then(response => {
          if (response.ok) {
            response.json().then(init => {
              apiTypeIdentifier = init.ati
              resolve(apiTypeIdentifier)
            })
          } else {
            reject(new Error('Error fetching API type identifier'))
          }
        })
        .catch(error => {
          reject(error)
        })
    } else {
      resolve(apiTypeIdentifier)
    }
  })
}
const FETCH_TIMEOUT_INTERVAL = 4500 // 4.5 seconds as we get a network request error at 5 seconds and we cannot catch the error after that
// const FETCH_TIMEOUT = 'Fetch timed out'
const FETCH_ERROR = 'Fetch error'
// // ref: https://dev.to/stereobooster/fetch-with-a-timeout-3d6
async function fetchWithTimeout (url, options = {}, timeout = FETCH_TIMEOUT_INTERVAL) {
  const { ...rest } = options
  if (rest.signal) throw new Error('Signal not supported in timeoutable fetch')
  if (includeApiTypeIdentifier && options.headers) {
    options.headers[apiTypeLabel] = apiTypeIdentifier
  }
  const controller = new AbortController()
  const { signal } = controller
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timed out in ${timeout} ms`))
      controller.abort()
    }, timeout)
    fetch(url, { signal, ...rest })
      .finally(() => clearTimeout(timer))
      .then(resolve, reject)
      .catch(err => {
        // eslint-disable-next-line
        console.error(err)
        reject(new Error(FETCH_ERROR))
      })
  })
}
// TODO: Rewrite all fetch calls to get rid of promises and use await/async
// The impact of changes to these functions is high so make the changes
// when there is ample time to test
//
async function fetchWithCredentials (apiBase, url, options, timeout) {
  const jwtToken = getJwtToken()
  // if (!jwtToken) {
  //   if (renewalFailureHandler !== null) {
  //     renewalFailureHandler()
  //   }
  //   return null // if token is null or undefined return null so requestapiaction can signout the user and show the login page
  // }
  options = options || {}
  options.headers = options.headers || {}
  options.headers['Authorization'] = 'Bearer ' + jwtToken
  options.headers['Saff-Authorization'] = 'Bearer ' + jwtToken
  if (includeApiTypeIdentifier) {
    options.headers[apiTypeLabel] = apiTypeIdentifier
  }
  if (timeout) {
    options.timeout = timeout
    const response = await fetchWithTimeout(`${apiBase}${url}`, options)
    return response
  }
  // const controller = new AbortController()
  // options.signal = controller.signal
  // const timer = setTimeout(() => {
  //   // // eslint-disable-next-line
  //   console.error(FETCH_TIMEOUT)
  //   controller.abort()
  // }, FETCH_TIMEOUT_INTERVAL)
  const response = await fetch(`${apiBase}${url}`, options)
  // clearTimeout(timer)
  if (response.ok) { // all is good, return the response
    return response
  }
  // if (response.status === 401 && response.headers.has('token-expired')) {
  if (response.status === 401) {
    const refreshToken = getJwtRefreshToken()
    // if (!refreshToken) {
    //   if (renewalFailureHandler !== null) {
    //     renewalFailureHandler()
    //   }
    //   return null // if refreshtoken is null or undefined return null so requestapiaction can signout the user and show the login page
    // }
    const refreshResponse = await renewToken(apiBase, jwtToken, refreshToken)
    if (!refreshResponse.ok) {
      if (renewalFailureHandler !== null) {
        renewalFailureHandler()
      }
      return response // failed to renew token so return original 401 response
    }
    const jsonRefreshResponse = await refreshResponse.json() // read the json with the new tokens

    saveJwtToken(jsonRefreshResponse.token)
    if (tokenUpdateHandler !== null) {
      tokenUpdateHandler(jsonRefreshResponse.token)
    }
    saveJwtRefreshToken(jsonRefreshResponse.refreshToken)
    const repeatResponse = await fetchWithCredentials(apiBase, url, options) // repeat the original request
    return repeatResponse
  } else { // status is not 401 and/or there's no Token-Expired header
    return response // return the original response
  }
}
var renewalFailureHandler = null
function handleJWTRenewalFailure (handler) {
  renewalFailureHandler = handler
}

var tokenUpdateHandler = null
function handleTokenUpdate (handler) {
  tokenUpdateHandler = handler
}

async function getToken (apiBase, username, password, authUrl = GET_TOKEN_URL, configUrl = INIT_URL) {
  return new Promise(async (resolve, reject) => {
    await getApiTypeIdentifier(`${apiBase}${configUrl}`)
      .then(ait => {
        const encodedString = 'Basic ' + btoa(username + ':' + password)
        const headers = new Headers()
        headers.set('Authorization', encodedString)
        headers.set('Saff-Authorization', encodedString)
        if (includeApiTypeIdentifier) {
          headers.set(apiTypeLabel, ait)
        }
        const url = `${apiBase}${authUrl}`
        fetchWithTimeout(url, {
          method: 'POST',
          headers: headers
        })
          .then(response => {
            if (response && response.ok) {
              response.json().then(tokens => {
                saveJwtToken(tokens.token)
                if (tokenUpdateHandler !== null) {
                  tokenUpdateHandler(tokens.token)
                }
                saveJwtRefreshToken(tokens.refreshToken)
                saveJwtTokenExpiry(tokens.tokenExpiry)
                resolve(true)
              })
            } else {
              throw response
            }
          })
          .catch(error => {
            error.json().then(body => {
              reject(body)
            })
          })
      })
      .catch(error => {
        reject(error)
      })
  })
}
async function renewToken (apiBase, jwtToken, refreshToken) {
  const headers = {}
  headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (includeApiTypeIdentifier) {
    headers[apiTypeLabel] = apiTypeIdentifier
  }
  const response = await fetch(`${apiBase}${RENEW_TOKEN_URL}`, {
    method: 'POST',
    body: `token=${encodeURIComponent(jwtToken)}&refreshToken=${encodeURIComponent(refreshToken)}`,
    headers
  })
  return response
}

function resetToken () {
  saveJwtToken('')
}

const parseJwt = token => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

export { handleJWTRenewalFailure, getJwtToken, getToken, getJwtRefreshToken, renewToken, fetchWithCredentials, fetchWithTimeout, parseJwt, handleTokenUpdate, setApiTypeIdentifier, saveJwtToken, saveJwtRefreshToken, saveJwtTokenExpiry, resetToken }
