import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@/actions/home'

import './style.scss'

@connect(state => state.home, { ...actions })
class Home extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  state = {
    loaded: false,
  }

  componentDidMount() {
    this.props.dispatchHome().then(() => {
      this.setState({ loaded: true })
    })
  }

  render () {
    return (
      <View className='home'>
        33
      </View>
    )
  }
}

export default Home
