---
title: 安装并配置Atom
date: 2018-11-16 16:22:33
tags:
---
## Atom官网:atom.io

#### Atom插件
>File->Settings control + ， 打开setting面板  点击install
>browser-sync 修改文件时自动部署
>静态项目监听 browser-sync --server --files "文件*.html/.css"
>动态项目监听  browser--sync --proxy "localhost:xxxx" --files "* .html"
>emmet插件:可以用一些速记符生成符合语法规则的HTML
>atom-beautify:辅助缩进，提高代码可读性
>autocomplete-paths：输入文件名时自动补全引用
>api-docs：通过键盘查阅文档，文档会在编辑器单独的一个标签面板中显示
>linter：检查代码风格和语法的程序，部分插件的前置插件
>linter-csslint：提供编写高性能css的建议//不建议使用，建议使用linter-stylelint
>linter-stylelint使用方法:在项目根目录新建官方文档的几种文件类型，我的是.stylelintrc.json
>安装标准配置`npm install stylelint-config-standard --save-dev`
>.stylelintrc.json文件中引入配置
```
{
  "extends": "stylelint-config-standard"
}
```
>linter-htmlhint：HTML保持良好格式
>linter-eslint:检查JavaScript代码的语法，还能通过配置检查代码的风格和格式
>默认镜像地址为国外的，atom使用apm方式下载，修改apm镜像地址为中国
`apm config set registry http://registry.npm.taobao.org`
>前端参考文档：mdn

#### 基础命令行
>查看当前路径 win:echo %cd%  mac: pwd
>新建目录: mkdir    新建front-end-dev-book和它的子目录ottergram
>mac:mkdir font-end-dev-book/ottergram
>win使用反斜杠: font-end-dev-book\ottergram
>切换目录:cd
>列出目录中文件:mac:ls win:dir
>获取管理员权限:mac:命令前加上sudo win直接用管理员打开
>退出:ctrl+c

#### 安装node.js和browser-sync
>node自带两个命令行程序：node和npm。node的工作室运行JavaScript程序
>browser-sync修改代码时，浏览器也会自动重新加载
>通过npm安装browser-sync : npm install g browser-sync
可能会出现安装失败的情况，需要把路径切换到nodejs下的.bin文件夹下，再把该路径加到环境变量path中去
Unsupported platform for fsevents@1.2.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
该错误是macos下的提示，Windows可以不管 输入browser-sync测试是否安装成功
