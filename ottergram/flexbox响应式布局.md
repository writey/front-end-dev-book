## flexbox
>根据浏览器窗口尺寸进行调整，并保持总体布局不变
>flexbox css 属性可以确保缩略图和大图区域填满整个屏幕，并保持彼此间的相对比例
>还能够将大图区域的内容水平、垂直居中，但如果使用标准盒模型很难实现
>再添加flexbox属性前现将HTML和body的高度设置为100%，允许内容填满浏览器或设备窗口
>为body 添加display: flex声明，将其转变为flex容器
>flex能控制子元素的布局(又叫flex项目) 在flex容器中flex的大小和位置沿着主轴和侧轴出现
>默认主轴从左向右 body中所有元素排成一行
>改变flex-direction: column可使项目从上到下排列
>flex属性: flex: 0 1 auto; 0：是否需要拉伸 1：有必要是否收缩 auto：自动计算大小
>order: 2;  源顺序：浏览器将它绘制在order属性更小的元素后面
>当父容器为flex属性且横向布局时 子元素的width属性会失效 需修改成max-width 和min-width
>justify-content: space-between;等间排序 flex-start:左对齐;flex-end右对齐；center：居中；space-around等间（起始和结束也会有间距）
>text-align:center；无需flexbox也可实现的剧中方式，只能水平居中
>justify-content:center ;沿主轴方向居中  align-items:center在flex项目侧轴方向居中

## 绝对定位和相对定位
>绝对定位必须满足以下三个条件
>1.position属性为absolute 告知浏览器该元素将脱离常规文档流，不与其兄弟元素以其布局
>2.使用top。right、bottom、left中的一个或多个属性设置坐标，值可以是px或百分比
>3.有一个position属性为relative或absolute的祖先元素。如果没有该绝对定位将会相对于HTML定位

## 文本特效
>text-shadow: rgba(0, 0, 0, 0.9) 1px 2px 9px;   文本阴影颜色为黑色 0.9透明度 向右偏移1px 向下偏移2px 模糊度为9px
