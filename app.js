const fs =  require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.set('view engine', 'ejs')




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

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(readFile)

app.get('/', (req, res) => {

  fs.readFile('./words.json', 'utf8', (err, data) => {
    
    if(err) console.log(err)
    data = JSON.parse(data)
    // data.crowd = "vir kora"

    // data = JSON.stringify(data)
    
    // fs.writeFile('./words.json', data, (err) => {
    //   if(err) console.log(err)
    //   console.log('file saved')
    // })

    console.log(data)

    res.render('index', { 
      title: 'Dictionary', 
      words: data
    })
    
  })

})

app.get('/add', (req, res) => {
  res.render('add', { title: 'add words' })
})

app.post('/add', (req, res) => {
  
  // console.log(req.body.eng,  req.body.bang)
  fs.readFile('./words.json', 'utf8', (err, data) => {
    
    if(err) console.log(err)
    data = JSON.parse(data)
    data[req.body.eng] = req.body.bang

    data = JSON.stringify(data)
    
    fs.writeFile('./words.json', data, (err) => {
      if(err) console.log(err)
      console.log('file saved')
    })

    res.end('done')
  })
})

app.listen(process.env.PORT || port, ()=>{
  console.log(`app started at ${port}`)
})