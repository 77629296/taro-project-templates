import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { Loading } from '@/components'
import { connect } from '@tarojs/redux'
import * as actions from '@/actions/home'
import { getWindowHeight } from '@/utils/style'
import Banner from './Banner'
import Policy from './Policy'
import Operation from './Operation'
import Category from './Category'

import './home.scss'

@connect(state => state.home, { ...actions })
class Home extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true
  }

  componentDidMount() {

    this.props.dispatchHome().then(() => {
      this.setState({ loaded: true })
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    const { homeInfo } = this.props
    return (
      <View className='home'>
        <ScrollView
          scrollY
          className='home__wrap'
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}
        >
          <View onClick={this.handlePrevent}>
            <Banner list={homeInfo.focus} />
            <Policy list={homeInfo.policyDesc} />

            {/* 不知道叫啥 */}
            <Operation
              list={homeInfo.operationCfg}
              sale={homeInfo.saleCenter}
            />

            {/* 类目热销榜 */}
            <Category data={homeInfo.hotCategory} />
          </View>

          {this.state.loading &&
            <View className='home__loading'>
              <Text className='home__loading-txt'>正在加载中...</Text>
            </View>
          }
          {!this.state.hasMore &&
            <View className='home__loading home__loading--not-more'>
              <Text className='home__loading-txt'>更多内容，敬请期待</Text>
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default Home
