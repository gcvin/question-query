import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '问题类目'
  }

  state = {
    category: []
  }

  componentWillMount() {
    const db = Taro.cloud.database()
    const category = db.collection('category')
    category.get().then(rs => {
      this.setState({
        category: rs.data
      })
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClick = (id) => {
    Taro.navigateTo({
      url: `/pages/list/index?id=${id}`
    })
  }

  onConsole = () => {
    Taro.navigateTo({
      url: `/pages/password/index`
    })
  }

  render() {
    const { category } = this.state
    return (
      <View className='index'>
        <View className="console" onClick={this.onConsole}>管理员</View>
        <View className="category">
          {category.map(item =>
            <View className="item" key={item._id} onClick={() => this.onClick(item._id)}>{item.name}</View>
          )}
        </View>
      </View>
    )
  }
}
