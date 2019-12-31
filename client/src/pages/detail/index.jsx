import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

export default class Detail extends Component {

  config = {
    navigationBarTitleText: '问题详情'
  }

  state = {
    detail: {}
  }

  componentWillMount() {
    const db = Taro.cloud.database()
    const question = db.collection('question')
    const id = this.$router.params.id
    question.doc(id).get().then(rs => {
      this.setState({
        detail: rs.data
      })
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { detail } = this.state
    return (
      <View className='detail'>
        <View className="question">{detail.question}</View>
        <View className="time">{detail.time}</View>
        <View className="answer">{detail.answer}</View>
      </View>
    )
  }
}
