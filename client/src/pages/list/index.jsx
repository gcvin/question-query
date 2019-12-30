import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'
import './index.less'

export default class List extends Component {

  config = {
    navigationBarTitleText: '问题列表'
  }

  state = {
    keyword: '',
    question: []
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onInput (value) {
    this.setState({
      keyword: value
    })
  }

  onSearch () {
    const db = Taro.cloud.database()
    const question = db.collection('question')
    const id = this.$router.params.id
    question.where({
      category_id: id,
      question: {
        $regex: '.*' + this.state.keyword + '.*',
        $options: 'i'
      }
    }).get().then(rs => {
      this.setState({
        question: rs.data
      })
    })
  }

  onClick (id) {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  render () {
    const { question } = this.state
    return (
      <View className='list'>
        <Input type='text' placeholder='请输入查询问题' onInput={(e) => this.onInput(e.currentTarget.value)}/>
        <Button plain type='primary' onClick={() => this.onSearch()}>查询</Button>
        <View className="question">
          {question.map(item =>
            <View className="item" key={item._id} onClick={() => this.onClick(item._id)}>
              <Text>{item.question}</Text>
              <Text>{item.answer}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }
}
