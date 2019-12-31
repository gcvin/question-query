const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')

cloud.init()

const db = cloud.database()
const categoryDB = db.collection('category')
const questionDB = db.collection('question')

exports.main = async(event) => {
  await categoryDB.where({
    _id: db.command.exists(true)
  }).remove()
  await questionDB.where({
    _id: db.command.exists(true)
  }).remove()
  
  const { fileID } = event
  const file = await cloud.downloadFile({ fileID })
  const sheets = xlsx.parse(file.fileContent)
  const rows = sheets[0].data.slice(1)

  const categorys = []

  const categoryNames = [...new Set(rows.map(row => row[0]))]
  const categoryTasks = categoryNames.map(categoryName => {
    return categoryDB.add({
      data: {
        name: categoryName
      }
    }).then(res => {
      categorys.push({
        _id: res._id,
        name: categoryName
      })
    })
  })

  await Promise.all(categoryTasks)

  const questionTasks = rows.map(row => {
    const [category_name, question, answer, time, remark] = row
    const category = categorys.find(item => item.name === category_name)
    const params = {
      category_name,
      category_id: category._id,
      question,
      answer,
      time: new Date(1900, 0, time - 1).toLocaleString(),
      remark
    }
    return questionDB.add({
      data: params
    })
  })

  await Promise.all(questionTasks)
}