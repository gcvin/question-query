const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')

cloud.init()

const db = cloud.database()

exports.main = async(event) => {
  const { fileID } = event
  const res = await cloud.downloadFile({ fileID })
  const buffer = res.fileContent
  const sheet = xlsx.parse(buffer)[0]

  const category = []
  const question = []

  for (let rowId in sheet['data']) {
    var row = sheet['data'][rowId]
    if (rowId > 0 && row) {
      const promise = db.collection('users')
        .add({
          data: {
            name: row[0], //姓名
            age: row[1], //年龄
            address: row[2], //地址
            wechat: row[3] //wechat
          }
        })
      tasks.push(promise)
    }
  }

  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function(err) {
    return err
  })
  return result
}