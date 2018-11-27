## JavaScript版本
>ECMAScript(简称ES) ES3 1999.12  
>ES 5 2009.12
>ES 6 2015.6
## JavaScript中的单引号与双引号
字符串既可以有单引号分割，也可以用双引号，如果使用双引号，则必须在字符串内部出现的双引号中加上转义字符
使用单引号则需要对字符串中的单引号转义
## dom交互
可以通过document对象及querySelector方法来与dom交互
## 阻止链接跳转
`event.preventDefault()``
## 随机数取整
`Math.ceil(min);`
向正无穷取整
`Match.floor(max)`
向负无穷取整
返回0-10整数`Match.floor(Match.random() * 11)`
## 闭包
假设将一个clickFunction函数作为回调函数:
```
function clickFunction (event){
  event.preventDefault();
  setDetails(detail);
}
function addHandler(detail){
  detail.addEventListener('click' clickFunction); //这行代码会报错
}
```
使用匿名函数则正常运行
```
function addHandler(detail){
  detail.addEventListener('click', function(event){
    event.preventDefault();
    setDetails(detail);
  });
}
```
因为detail在addHandler的函数体内。当一个函数定义在另一个函数内时，前者可以使用后者所有的参数和变量。
被称为闭包。
从技术上来说，当回调函数最终执行时，addHandler函数的变量和参数将不再存在，他们在韩束节后后便消失了。
然而，回调函数"捕获"了addHandler中的变量和参数值，并使用捕获的值来执行语句
## NodeList和 HTMLCollection
document.querySelectorAll()  返回nodelist
document.getElementsByTagName() 返回HTMLCollection
HTMLCollection 返回的是动态的节点，当删除dom元素时，HTMLCollection也会跟着改变
## JavaScript类型
基本类型
字符串 "asd"
数值   1,1.2
布尔   true
空     null
未定义 undefined
其他类型均为符合类型或复杂类型 其中包括数组和对象
