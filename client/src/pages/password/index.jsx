import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'
import './index.less'

export default class Password extends Component {

  config = {
    navigationBarTitleText: '输入密码'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onClick = () => {
    if (this.password === '123123') {
      Taro.navigateTo({
        url: `/pages/console/index`
      })
    } else {
      Taro.showToast({
        title: '密码错误！',
        icon: 'none'
      })
    }
  }

  onInput = (e) => {
    this.password = e.currentTarget.value
  }

  render() {
    return (
      <View className='password'>
        <Input placeholder='请输入密码' className="input" onInput={this.onInput} />
        <Button className="button" type='primary' onClick={this.onClick}>确定</Button>
      </View>
    )
  }
}
