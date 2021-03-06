# Dragact
[![npm version](https://img.shields.io/npm/v/dragact.svg)](https://www.npmjs.com/package/dragact) [![npm downloads](https://img.shields.io/npm/dm/dragact.svg)](https://www.npmjs.com/package/dragact)


Dragact 是一款React组件，他能够使你简单、快速的构建出一款强大的 **拖拽式网格(grid)布局**.

![](https://github.com/215566435/React-dragger-layout/blob/master/example/image/NormalLayoutDemo.gif)
![](https://github.com/215566435/React-dragger-layout/blob/master/example/image/resizing.gif)

# Demo地址
[Live Demo(预览地址)](http://htmlpreview.github.io/?https://github.com/215566435/React-dragger-layout/blob/master/build/index.html)

# 特点

- [x] 自动布局的网格系统
- [x] 手机上也可以操作
- [x] 高度自适应
- [x] 静态组件([Live Demo(预览地址)](http://htmlpreview.github.io/?https://github.com/215566435/React-dragger-layout/blob/master/build/index.html))
- [x] 拖拽组件([Live Demo(预览地址)](http://htmlpreview.github.io/?https://github.com/215566435/React-dragger-layout/blob/master/build/index.html))
- [x] 自动缩放组件
- [x] 自定义拖拽把手



# 快速开始
```
npm install --save dragact
```

### 最简单的例子🌰
```javascript
//index.js
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Dragact } from 'dragact';

const fakeData = [
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '0' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '2' }
]

const blockStyle = {
    background: 'grey',
    height: '100%'
};

ReactDOM.render(
    <Dragact
        layout={fakeData}//必填项
        col={16}//必填项
        width={800}//必填项
        rowHeight={40}//必填项
        margin={[5, 5]}//必填项
        className='plant-layout'//必填项
        style={{ background: '#eee' }}//非必填项
        placeholder={true}//非必填项
    >
        {(item, isDragging) => {
            return <div style={blockStyle}>
                {isDragging ? '正在抓取' : '停放'}
            </div>
        }}
    </Dragact>,
    document.getElementById('root')
);
```


# 组件设计哲学

### 1.依赖注入式的挂件(widget)

可以从最简单的例子看出，我们渲染子组件的方式和以往有些不同。以往的React组件书写方式，采用的是类似以下写法：
```jsx
    <Dragact
        col={8}
        width={800}
        margin={[5, 5]}
        rowHeight={40}
        className='plant-layout'
    >
        <div key={0} data-set={{ GridX: 0, GridY: 0, w: 4, h: 2 }} className='layout-child'>0</div>
        <div key={1} data-set={{ GridX: 0, GridY: 0, w: 1, h: 2 }} className='layout-child'>1</div>
        <div key={2} data-set={{ GridX: 0, GridY: 0, w: 3, h: 2 }} className='layout-child'>2</div>
    </Dragact>,
```
这么做当然可以，但是有几个问题：
- 子组件非常的丑，需要我们定义一大堆东西
- 很难监听到子组件的事件，比如是否拖拽等
- 如果有大量的数据时，就必须写对数组写一个map函数，类似:``layout.map(item=>item);`` 来帮助渲染数组

为了解决这个问题，我将子组件的渲染方式进行高度抽象成为一个**构造器**，简单来说就是以下的形式：
```jsx
    <Dragact
        layout={fakeData}//必填项
        ....
    >
        {(item, isDragging) => {
            return <div style={blockStyle}>
                {isDragging ? '正在抓取' : '停放'}
            </div>
        }}
    </Dragact>,
```
现在，我们子元素渲染变成一个小小的**构造函数**，第一个入参是您输入数据的每一项，第二个参数就是**isDragging**，状态监听参数。

这么做，轻易的实现了，组件漂亮，不用写map函数，不用写key，同时更容易监听每一个组件的拖拽状态**isDragging**.

更多的依赖注入思想以及好处，请看我的知乎问答：[知乎，方正的回答：如何设计一款组件库](https://www.zhihu.com/question/266745124/answer/322998960)


### 2.流畅的组件滑动

为了保证拖拽时候的手感舒适，我通过设置元素的translate(x,y)来进行实现，并且配合CSS动画，使得每一步的移动都是那么的顺畅。

你能够很轻易的看到每一个组件到底滑向哪里，到底坐落在哪里。


### 3.数据驱动的模式

>视图的改变就是数据的改变

这是React给我们的一个启示，Dragact组件通过对数据的处理，达到了数据变化即视图变化。

这么做的好处就是我们可以轻松的**将布局信息记录在服务器的数据库中**，下一次拿到数据的时候，就可以轻松的**恢复原来的视图位置**。

通过获取dragact组件的实例，我提供了一个api ```getLayout():DragactLayout;```，用于获取当前的**布局信息**。


### 4.拖拽把手的设计
设计一个拖拽把手，必须要两个步骤。
1. 挂件中拖拽把手拥有一个```id='dragact-handle'```的html tag（```<div id='dragact-handle'>我是把手</div>```);
2. 在数据中标记是否存在把手
```ts
const layout = [
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '0',handle:true },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '2' }
]

```

这样的一个设计，略显繁杂，但是起码能够保证了把手的**自定义**，或许在下个版本中我将设计一款高皆组件，使得书写拖拽把手更加轻便简洁。




# Dragact 提供的属性

### 数据属性
数据属性指的是我们每一个组件所拥有的属性,类似以下的一组数据
```ts
const layout = [
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '0',canResize:false,static:true,canDrag:false,handle:true },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '2' }
]

GridX:number//必填，挂件布局中的横坐标
GridY:number//必填，挂件布局中的纵坐标
w:number//必填，挂件布局中宽度，整数
h:number//必填，挂件布局中高度，整数
key:number|string//必填，挂件在布局中的唯一id
canResize:boolean //非必要，能否调整大小的开关
static:boolean //非必要，静态组件的开关
canDrag:boolean //非必要，是否能拖拽的开关
handle:boolean //非必要，是否有拖拽把手的开关
```


### 组件属性
```ts
interface DragactProps {
    layout?: DragactLayout[] //暂时不推荐使用
    /** 
     * 宽度切分比 
     * 这个参数会把容器的宽度平均分为col等份
     * 于是容器内元素的最小宽度就等于 containerWidth/col
    */
    col: number,

    /** 
     * 容器的宽度
    */
    width: number,

    /**容器内每个元素的最小高度 */
    rowHeight: number,

    /**
     * 容器内部的padding
     */
    padding?: number,

    children: any[] | any


    // 
    // interface GridItemEvent {
    //     event: any //浏览器拖动事件
    //     GridX: number //在布局中的x格子  
    //     GridY: number //在布局中的y格子  
    //     w: number //元素的宽度
    //     h: number //元素的高度
    //     UniqueKey: string | number //元素的唯一key
    // }

    /**
     * 拖动开始的回调
     */
    onDragStart?: (event: GridItemEvent) => void

    /**
     * 拖动中的回调
     */
    onDrag?: (event: GridItemEvent) => void

    /**
     * 拖动结束的回调
     */
    onDragEnd?: (key: number | string) => void

    /**
     * 每个元素的margin,第一个参数是左右，第二个参数是上下
     */
    margin: [number, number]

    /** 
     * layout的名字
    */
    className: number | string
}

```

# Ref Api
获取到组件的ref，就可以使用其api

```ts
/*
返回当前的layout.
*/
getLayout():DragactLayout;


```




# 测试
```
git clone https://github.com/215566435/Dragact.git
cd Dragact
npm install 
npm run test
```


# 贡献

### 想要一个新的特色、功能？
1. 如果你想添加一些新功能或者一些非常棒的点子，请发起issue告诉我，谢谢！
2. 如果你已经阅读过源代码，并且添加了一些非常牛X🐂的点子，请发起你的PR.

### 有bug?
如果你发现了本项目的Bug，请务必马上告诉我。添加一个issue，并且帮忙给出最最简单重现的例子，这能让我快速定位到Bug帮你解决，谢谢！




# TODO-LIST
- [ ] horizontal swaping
- [x] resizing
- [x] touch handle
- [ ] responsive layout
- [ ] SSR/server rendering 
