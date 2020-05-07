import Taro from '@tarojs/taro'
import { AtTabBar }  from 'taro-ui'
import { connect } from '@tarojs/redux'
import { switchTabbar } from '@/actions/common'

import './style.scss'

const tabList =[
  {
    title: '首页',
    iconType: 'icon_home',
    page: '/pages/home/index',
  },
  {
    title: '我的',
    iconType: 'icon_user',
    page: '/pages/user/index',
  },
]

@connect(state => state.common, { switchTabbar })
export default class Tabbar extends Taro.Component {

  componentDidMount() {
    console.log(this.props)
  }
  
  handleClick = (value) => {
    const currentPage = tabList[value]
    this.props.switchTabbar(value)
    
    Taro.switchTab({
      url: currentPage.page,
    })
  }

  render () {
    let { currentTabBar } = this.props
    return (
      <AtTabBar
        tabList={tabList}
        onClick={this.handleClick}
        current={currentTabBar}
      />
    )
  }
}