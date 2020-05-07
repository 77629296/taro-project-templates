import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@/actions/user'
import { getWindowHeight } from '@/utils/style'
import Profile from './profile'
import './style.scss'

@connect(state => state.user, { ...actions })
class User extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  componentDidShow() {
    console.log(this.props)
    // this.props.dispatchUser()
  }

  render () {
    // const { userInfo } = this.props

    return (
      <View className='user'>
        <ScrollView
          scrollY
          className='user__wrap'
          style={{ height: getWindowHeight() }}
        >
          ddd
          {/* <Profile userInfo={userInfo} /> */}
        </ScrollView>
      </View>
    )
  }
}

export default User
