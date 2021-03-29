const fs =  require('fs')
const express = require('express')
const app = express()
const port = 3000


const readFile = ((req, res, next) => {
  
  console.log('reading file...')
  
  fs.readFile('./words.json', 'utf8', (err, data) => {
    
    if(err) console.log(err)
    data = JSON.parse(data)
    data.crowd = "vir kora"

    data = JSON.stringify(data)
    
    fs.writeFile('./words.json', data, (err) => {
      if(err) console.log(err)
      console.log('file saved')
    })

    console.log(data)
  })

  next()
})

app.use(readFile)

app.get('/', (req, res) => {
  res.send('hello');
})

app.listen(process.env.PORT || port, ()=>{
  console.log(`app started at ${port}`)
})