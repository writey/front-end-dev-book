## 隐藏及显示大图
要求:当用户触发某一条件（如按下esc）时修改页面样式。
一种方法是创建新的选择器，并且用JavaScript把这两个类添加到目标元素上去，但效率并不高。
更好的方法是只是用JavaScript添加一个类选择器，并使其影响整个布局。
然后就可以通过这个新选择其定位作为额后代的类
```
.hidden .class1 {

}
.hidden .class2 {

}
```
直接为他们的父节点添加hidden类即可
## 过渡改变状态
鼠标停留在盒子上时改变盒子大小
使用修饰符:hover 来说明此样式仅应用于鼠标悬停时
```
.box:hover {
  transform: scale(1.2);
  transition: transform 300ms;
}
```
放大1.2倍时间为300毫秒
## 使用JavaScript触发过渡效果
点击a区域的缩略图时，b区域的大图开始缩小，缩小到最小的点时，更改图片，放大回原来的大小。
```
.b {
  transition: transform 800ms;/* 设置图片过渡时间 */
}

.is-tiny {
  transform: scale(0.001); /* 图片最小0.001倍 */
}

b.classList.add('is-tiny');
setTimeout(function(){
    b.classList.remove('is-tiny');
},800);
```
当点击b元素时，为b元素添加is-tiny样式过度时间为800ms，此时图片开始缩小，设置定时函数，800ms后
之后回调函数，移除b元素的is-tiny样式，图片开始放大。
