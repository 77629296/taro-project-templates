import {
  SET_CURRENT_TABBAR
} from '@/constants/common'

/**
 * 切换tabbar
 * @param {*} payload
 */
export const switchTabbar = payload => (dispatch) => dispatch({ type : SET_CURRENT_TABBAR, payload })
