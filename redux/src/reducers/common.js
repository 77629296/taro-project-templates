import { SET_CURRENT_TABBAR } from '@/constants/common'

const INITIAL_STATE = {
  currentTabBar: 0
}

export default function common(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_CURRENT_TABBAR: {
      return {
        ...state,
        currentTabBar: action.payload
      }
    }
    default:
      return state
  }
}
