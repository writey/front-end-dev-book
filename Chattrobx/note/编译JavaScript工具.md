## Babel
Babel 是一个编译器，他负责将ES6语法翻译成等价的ES5代码，可解决大部分浏览器兼容问题。
## 安装模块
全局安装Babel客户端 `npm install -g babel-cli`
安装编译方式 `npm install --save-dev babel-core`
辅助编译工具 `npm install --save-dev browserify babelify watchify`
安装编译标准 `npm install --save-dev babel-preset-es2015`
## 配置Babel
使用es2015预设配置来配置Babel：在根目录下创建一个名为.babelrc的文件，写入配置信息。
```
{
  "presets": [
    "es2015"
  ],
  "plugins": []
}
```
## 使用
1. 编译
`babel file1 -o file2` 编译文件1，输出到文件2.
2. 打包模块
babel虽然可以理解se6模块，但却不能转换等价的es5代码，需要用到browserify.
package.json中添加配置
```
"browserify": {
  "transform": [
    ["babelify", {"presets": ["es2015"], "sourceMap": true}]
  ]
}
```
将babelify当做一个插件，传入了两个选项:`"presets": ["es2015"]`激活es2015编译器选项，`"sourceMap": true`启用source maps调试
3. 编写脚本
package.json的scripts中添加配置
```
"build": "browserify -d app/scripts/src/main.js -o app/scripts/dist/main.js",
"watch": "watchify -v -d app/scripts/src/main.js -o app/scripts/dist/main.js",
```
build：编译脚本，watch:可在启动服务器时自动编译。
4. 声明模块
```
class A {

}
export default A;
```
5. 引入模块
```
import ChatApp from './app';

new ChatApp();
```
