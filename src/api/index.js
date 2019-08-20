import axios from 'axios'
import { CITY, TOKEN } from '../utils/token'
import { SignInMart } from '@roto/bridge'
import { Message } from '@roto/component-vact'

export async function thk (config) {
  const thk_instance = axios.create({
    timeout: 10 * 1000,
    headers: {
      'content-type': 'application/json;charset=utf-8',
      'accept': 'application/json'
    }
  })

  thk_instance.interceptors.response.use(null, error => {
    Message.create({type: 'error', message: error.message}).show()
    return Promise.reject(new Error(error.message || '请求错误'))
  })
  return thk_instance(config)
}

export async function toc (config) {
  const city = CITY.get() || undefined
  const token = TOKEN.get()
  const cityFlag = city ? (city.CityFlag === 'qt' ? 'wx' : city.CityFlag) : 'sz'

  const toc_instance = axios.create({
    timeout: 10 * 1000,
    baseURL: `/${cityFlag}`,
    headers: {
      'content-type': 'application/json;charset=utf-8',
      'accept': 'application/json'
    },
    params: {
      accesstoken: token && token.AccessToken,
      customerguid: token && token.CustomerGuid,
      sourcetype: (token && token.SourceType) || 9
    },
    data: {
      AccessToken: token && token.AccessToken,
      CustomerGuid: token && token.CustomerGuid,
      SourceType: (token && token.SourceType) || 9
    }
  })

  toc_instance.interceptors.response.use(response => {
    const data = response.data

    if (data.Error === 0 || !data.Error) return data
    else {
      let message = data.Message || '请求错误'
      if (data.Error !== void 0) {
        if (data.Error === -1) {
          message = '登录信息失效，请重新登陆！'
          setTimeout(() => {
            SignInMart.init({ test: true, queryArray: [] }).execute()
          }, 1500)
        } else if (data.Error === -2) {
          message = '系统维护，请稍后再试！'
        } else if (data.Error === 999) {
          message = '系统发生未知异常，请稍后再试！'
        }
      }
      Message.create({type: 'error', message}).show()
      return Promise.reject(new Error(message))
    }
  }, err => {
    Message.create({type: 'error', message: err.message}).show()
    return Promise.reject(new Error(err.message || '请求错误'))
  })

  return toc_instance(config)
}
