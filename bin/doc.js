const shell = 'apidoc -i router/ -o static/apidoc/'
const process = require('child_process');

//清空指定文件夹下文件
function gendoc(){
    process.exec(shell,function(err){
        if(err == null){
            console.log('doc generate success')
            return 'doc generate success'
        }else{
            console.log('doc generate err')
            return 'doc generate err'
        }
    })
}
module.exports = gendoc();