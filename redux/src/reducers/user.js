import {
  USERINFO,
} from '@constants/user'

const INITIAL_STATE = {
  userInfo: null,
}

export default function home(state = INITIAL_STATE, action) {
  console.warn(action)
  switch(action.type) {
    case USERINFO: {
      return {
        ...state,
        authCode: action.payload
      }
    }
    default:
      return state
  }
}
