import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '问题管理'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  chooseExcel = () => {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        this.uploadExcel(res.tempFiles[0].path)
      }
    })
  }

  uploadExcel = (path) => {
    wx.cloud.uploadFile({
      cloudPath: 'question.xlsx',
      filePath: path,
      success(res) {
        this.parseExcel(res.fileID)
      }
    })
  }

  parseExcel = (fileID) => {
    wx.cloud.callFunction({
      name: 'excel',
      data: { fileID },
      success() {
        Taro.showToast({
          title: '上传解析成功！'
        })
      }
    })
  }

  render() {
    return (
      <View className='console'>
        <Button type="primary" className="button" onClick={this.chooseExcel}>上传EXCEL</Button>
      </View>
    )
  }
}
