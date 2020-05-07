import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '@/constants/status'
import { logError } from './error'
import { getCurrentPageUrl } from './common'

const CODE_SUCCESS = '200'
const CODE_AUTH_EXPIRED = '600'

function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    Taro.setStorage({ key: 'token', data: data['3rdSession'] || '' }),
    Taro.setStorage({ key: 'uid', data: data['uid'] || ''})
  ])
}

export default fetch = async (options) => {
  const { url, data, method = 'GET', contentType = 'application/json', showToast = true, autoLogin = true } = options

  console.log('options', options)
  const option = {
    url,
    method,
    data,
    header: {
      'content-type': contentType,
      'Authorization': Taro.getStorageSync('Authorization')
    }
  }
  return Taro.request(option).then(async (res) => {
    console.log(res)
    const { code, data } = res.data

    if (code !== CODE_SUCCESS) {
      if (code === CODE_AUTH_EXPIRED) {
        await updateStorage({})
      }
      return Promise.reject(data)
    }

    // 更新登录信息
    // if (url === API_USER_LOGIN) {
    //   await updateStorage(data)
    // }

    return data
  }).catch((err) => {
    const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
      // Taro.navigateTo({
      //   url: '/pages/login/index'
      // })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}