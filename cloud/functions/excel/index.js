const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')

cloud.init()

const db = cloud.database()
const categoryDB = db.collection('category')

exports.main = async(event) => {
  const { fileID } = event
  const res = await cloud.downloadFile({ fileID })
  const sheets = xlsx.parse(res.fileContent)
  const rows = sheets[0].data

  const categoryNames = []
  const categoryIds = []
  const question = rows.map(async row => {
    const [category_name, question, answer, time, remark] = row
    const index = categoryNames.indexOf(category_name)
    if (index === -1) {
      categoryNames.push(category_name)
    }
    return {
      category_name,
      question,
      answer,
      time,
      remark
    }
  })

  const tasks = category.map(item => categoryDB.add({
    data: {
      name: item
    }
  }))


  const question = []

  rows.map(row => row[0])

  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function(err) {
    return err
  })
  return result
}