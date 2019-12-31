import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'
import './index.less'

export default class List extends Component {

  config = {
    navigationBarTitleText: '问题列表'
  }

  state = {
    keyword: '',
    question: [],
    loading: false
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onSearch = () => {
    const { keyword } = this.state
    if (!keyword.trim()) {
      return Taro.showToast({
        icon: 'none',
        title: '查询问题不能为空！'
      })
    }
    this.setState({
      loading: true
    })
    const db = Taro.cloud.database()
    const question = db.collection('question')
    const id = this.$router.params.id
    question.where({
      category_id: id,
      question: {
        $regex: '.*' + keyword + '.*',
        $options: 'i'
      }
    }).get().then(rs => {
      this.setState({
        question: rs.data,
        loading: false
      })
    })
  }

  onClick = (id) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  onInput = (e) => {
    this.setState({
      keyword: e.currentTarget.value
    })
  }

  render() {
    const { question, loading } = this.state
    return (
      <View className='list'>
        <View className="form">
          <Input placeholder='请输入查询问题' className="input" onInput={this.onInput} />
          <Button className="button" type='primary' loading={loading} onClick={this.onSearch}>查询</Button>
        </View>
        {question.length && question.map(item =>
          <View className="item" key={item._id} onClick={() => this.onClick(item._id)}>
            <View className="question">{item.question}</View>
            <View className="answer">{item.answer}</View>
          </View>
        )}
        {!question.length && <View className="blank">暂无查询结果</View>}
      </View>
    )
  }
}
