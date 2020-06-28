const express=require('express')
const Router= express.Router()
const multer= require('multer')
const crypto = require('crypto')
const fs = require('fs')
const dbModel =require('../db/model/file_temporary')
const logModel =require('../db/model/err_log')
const { db } = require('../db/model/file_temporary')
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
    // 指定文件路径
		cb(null, './static/media')
	},
	filename: function(req, file, cb) {
    // 指定文件名
    //文件名重复覆盖
    // 后缀名发生改变

    let exts=file.originalname.split('.')
    let ext=exts[exts.length-1]
    
    let tmpname=(new Date()).getTime()+'-'+parseInt(Math.random()*9999)
		cb(null, `${tmpname}.${ext}`);
	}
});
var upload = multer({
	storage: storage
});
/**
 * @api {post} /file/upload  文件上传
 * @apiGroup File
 * 
 * @apiParam {String} file  file
 * @apiParam {String} name  img 附件name
 */
Router.post('/upload',upload.single('img'),(req,res)=>{
  try {
    let types=['jpg','jpeg','png','gif'] //允许上传的数据类型
    let tmp=req.file.mimetype.split('/')[1]
    if(req.file.size>1024 * 1024 * 100){
      return  res.send({code:-1,msg:'尺寸过大'})
    }else if(types.indexOf(tmp)==-1){
      return  res.send({code:-2,msg:'类型错误'})
    }else{
      let {originalname,size,mimetype} = req.file
      let filepath = './static/media/'+req.file.filename
      let filebuffer = fs.readFileSync( filepath ) // 读取文件
      hash.update( filebuffer );
      const hash = crypto.createHash('md5');
      let imgMd5 = hash.digest('hex') // 计算MD5
      dbModel.find({hash:imgMd5}) // 查找重复md5
      .then((hash)=>{
        if(hash.length == 0 ){
          dbModel.insertMany({hash:imgMd5,path:req.file.filename,mimetype,size,originalname}) // 插入图片
          .then((db)=>{
            res.send({code:0,msg:'success',data:{imgPath:req.file.filename}})
          })
          .catch((err)=>{
            logModel.insertMany({log:err,errcode:'file insert err'}) // 捕获错误信息
            res.send({code:1,msg:'内部错误'})
          })
        }else{ // 返回重复图片路径
          res.send({code:0,msg:'重复的图片',data:{imgPath:req.file.filename}})
          //logerr(imgMd5 + req.file.filename,'img hash repeat','图片MD5重复')
        }
      })
      .catch((err)=>{
        logerr(err,'file insert err','内部错误')
      })
      
    }
  } catch (error) {
    console.log(error)
    logModel.insertMany({log:error,errcode:'file upload err'})
    res.send({code:2,msg:'运行异常'})
  }
 
  function logerr(err,errcode,errmsg){
    /**
     * err 错误信息
     * errcode 错误代码位置
     * errmsg 返回前端的提示信息
     */
    logModel.insertMany({log:err,errcode:errcode})
    res.send({code:1,msg:errmsg})
  }
})
module.exports=Router
