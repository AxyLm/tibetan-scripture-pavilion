const express=require('express')
const Router= express.Router()
const multer= require('multer')
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
    // 指定文件路径
		cb(null, './static/image')
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
 * @apiParam {String} file  file.
 * 
 */
Router.post('/upload',upload.single('img'),(req,res)=>{
  let types=['jpg','jpeg','png','gif'] //允许上传的数据类型
  let tmp=req.file.mimetype.split('/')[1]

  if(req.file.size>10000000){
      return  res.send({code:-1,msg:'尺寸过大'})
  }else if(types.indexOf(tmp)==-1){
      return  res.send({code:-2,msg:'类型错误'})
  }else{
    res.send({code:0,msg:'ok',data:{imgPath:req.file.filename}})
  }
  
 
})

module.exports=Router
