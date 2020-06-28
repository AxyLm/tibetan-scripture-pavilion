# Tibetan Scripture Pavilion [藏经阁]


# 安装依赖
    npm install 

# 启动 
    npm start
// 需要配置nodemon 环境变量 或者node start
## 启动流程
    npm start => nodemon start[修改自启动] => express => 连接mongo => 生成doc

# 生成接口api
## 安装apidoc
// 全局安装apidoc

    npm install apidoc -g 

## 生成
// 从 router/ 目录生成api页面到 public/apidoc/

    apidoc -i router/ -o static/apidoc/ 

