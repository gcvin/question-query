import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '问题管理'
  }

  state = {
    loading: false
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  chooseExcel = () => {
    const that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        that.setState({
          loading: true
        })
        that.uploadExcel(res.tempFiles[0].path)
      }
    })
  }

  uploadExcel = (path) => {
    const that = this
    wx.cloud.uploadFile({
      cloudPath: 'questions.xlsx',
      filePath: path,
      success(res) {
        that.parseExcel(res.fileID)
      }
    })
  }

  parseExcel = (fileID) => {
    const that = this
    wx.cloud.callFunction({
      name: 'excel',
      data: { fileID },
      success() {
        wx.cloud.deleteFile({
          fileList: [fileID],
          success() {
            that.setState({
              loading: false
            })
            Taro.showToast({
              title: '上传解析成功！',
              icon: 'none'
            })
            Taro.navigateTo({
              url: `/pages/index/index`
            })
          }
        })
      }
    })
  }

  render() {
    const {loading} = this.state
    return (
      <View className='console'>
        <Button type="primary" className="button" loading={loading} onClick={this.chooseExcel}>上传EXCEL</Button>
      </View>
    )
  }
}
