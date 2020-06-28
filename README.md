# Tibetan Scripture Pavilion [藏经阁]


# 安装依赖
    npm install 

# 启动 
    nodemon start or node start
// 需要配置nodemon 环境变量 或者node start

# 生成接口api
    npm install apidoc -g 
// 全局安装apidoc
    apidoc -i router/ -o static/apidoc/ -e node_modules 
// 从 router/ 目录生成api页面到 public/apidoc/ 并忽略 node_modules
