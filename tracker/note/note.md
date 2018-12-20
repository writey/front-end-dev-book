## ember 框架
一款MVC框架。
1. 安装框架
`npm install -g ember-cli`
2. 安装 ember inspector
Chrome浏览器上的ember的调试助手。
Chrome商店搜索扩展安装。
3. 安装watchman
ember-cli中需要用到的工具：检测项目文件实现实时刷新。
`brew install watchman`
windows: 下载压缩包，安装，添加环境变量 path:.exe所在的目录。
4. 添加编译sass功能
终端安装ember-cli-sass： `ember install ember-cli-sass`
把app.css修改为app.sass进行测试
5. 导入依赖
安装bootstrap-sass：`npm install bootstrap-sass --save`
打开ember-cli-build.js文件，修改项目依赖。
添加一个sassOptions对象，有一个includePaths属性，值为Bootstrap样式表的路径。
```
const bootstrapPath = 'node_modules/bootstrap-sass/assets/';
let app = new EmberApp(defaults, {
  // Add options here
  sassOptions: {
    includePaths: [
        bootstrapPath + 'stylesheets'
    ]
  }
});

// 使用import指向路径添加对该资源的引用
app.import(bootstrapPath + 'javascripts/bootstrap.js');
```
在需要使用bootstrap的sacc文件中导入bootstrap `@import 'bootstrap';`
6. 使用ember插件库
使用ember自带插件，可以省去配置的麻烦，开箱即用（如果没有特殊配置需求）。
以fontawesome为例：
ember客户端安装插件:`ember install @fortawesome/ember-fontawesome`
安装到项目`npm i --save-dev @fortawesome/free-solid-svg-icons`
模板中即可直接使用`{{ fa-icon 'coffee' }}`

## ember路由
在根目录使用 `ember g route 路由名称` 来创建路由。
会在routes,templates路径生成对应的模板和js文件，在route.js文件中添加对应的路由配置。
```
Router.map(function() {
  this.route('sightings', function() {
    this.route('new');
  });
  this.route('sighting');
});
```
Router.map接收一个回调函数用来注册路由，在回调函数中使用this.ruote('name')来注册，同时this.route的第二个参数也接收一个回调函数来注册路由。
##### 模板嵌套
模板中{{outlet}}代表加载上级路由中的内容。

## 路由钩子
每当URL发生改变时，应用都会在后台重新初始化路由对象。
路有对象中有各种钩子：beforeModel、model、afterModel、setController和stupController。
`this.transitionTo('')`路由跳转。
## 模板语言
```
{{#each model as |sighting|}}
  <li class="list-group-item">
    {{sighting.location}} - {{sighting.SightedAt}}
  </li>
{{/each}}
```
很容易理解，each循环model，遍历对象名称为sighting。

## bower
包管理工具。 `npm install -g bower`
