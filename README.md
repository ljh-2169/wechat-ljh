# test3

> A Vue.js project

后台和数据库在“back-end”分支里。
数据库名“wechat”,字符集“utf8 -- UTF-8 Unicode”，排序规则“utf8_general_ci”

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

测试账户：（1）用户名：xiaozhupeiqi  密码：123  （2）用户名：baba 密码：123  （3）其他账户：用户名为小写拼音，密码为123.可进入数据库表user_info查看。
修改头像时，需要将 “src\store\index.js”的第52行path改为自己本地的路径。
发送图片时，需要将“src\components\chat\chatroom.vue”的第145行path改为自己本地的路径。
