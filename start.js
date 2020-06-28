const app = require('express')()
const path=require('path')
const express = require('express')
const Router = express.Router()
const exStatic = require("express-static")
const db = require('./db/connect')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()//解析json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//通过cors 解决跨域
   const cors=require('cors')
   app.use(cors())

const FileRouter = require('./router/fileRouter')


app.use('/file',FileRouter)

app.use('/public',express.static(path.join(__dirname,'./static/media/')))
app.use('/',express.static(path.join(__dirname,'./static/apidoc'))) //默认页

let port = '1617'
app.listen(port,()=>{
  console.log('start：http://localhost:'+port)
})
