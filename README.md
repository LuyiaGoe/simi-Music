# vue-pro-03

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 准备工作
1. 图片
2. 后端api https://neteasecloudmusicapi.vercel.app
3. 创建相应文件夹
4. 插件下载及导入
5. main.js

### 首页制作
1. 采用elementui的Container 布局容器
2. 侧边栏采用NavMenu 导航菜单组件
 + 使用 vue-router 的模式 即：:router="true"
 + 取消选中高亮，使高亮跟普通字体颜色一样 active-text-color="black"
 + 设置路由index
3. 设置登录
 + dialog组件 弹出登录框
 + 带验证的 Form表单组件 输入登录信息
 + 配置vecel后端api，并设置axios根路径，vue.config.js配置跨域问题
 + 向api的/login/cellphone发送请求进行登录操作，登陆成功会返回res.data.coda=200
 + 存储登录后的cookie信息到 localStorage ，命名为musicCookie
 + 设置头像，头像图片URL存在res.data.profile.avatarUrl中
4. 设置退出登录
5. 获取用户歌单并循环放入侧边栏
 + 向/user/playlist请求，歌单在res.data.playlist中，存入currentUserPlayList
 + 侧边栏v-for循环currentUserPlayList,通过其中的subscribed判断是用户创建的还是收藏的歌单
 + v-if与v-for不能在同一个标签中使用，通过外包一层div将v-for与key扔到里面避免该问题
6. 主体部分路由设置
7. 脚部播放组件
 + 通过slider组件实现
 + 左边放置歌曲图片、名、歌手，中间放滑动条、前后首、暂停播放按钮，右边放音量、歌单
 + 设置全局过滤器，将播放时间过滤成mm:ss的形式，并将过滤后的时间放到滑动条两侧
8. 待制作播放功能！！！！

### 发现音乐页制作
1. tab标签页制作
 + tab页签头更换样式
 + tab内容中放入router-view，并根据不同的页签配置不同的路由
2. 个性推荐页制作
 + 轮播图采用Carousel 走马灯形式
 + 轮播图api为‘bannner’
 + 推荐歌单区域采用Divider 分割线
 + 歌单内容列表采用layout布局，一行4个单元通过获取列表清单后循环渲染上去（此处出现空白渲染bug  通过对el-row更改flex布局并设置flex-wrap换行解决
 + 独家放送页同上
 + 最新歌曲采用el-row+el-table方式布局
 + 待制作MV页面和给每个区域标题添加超链接！！！！
3. 歌单页面制作
 + 添加分类按钮，根据分类获取不同的歌单
 + 制作歌单列表
 + 待制作分页功能！！！！
4. 排行榜页面制作
5. 歌手页面制作
6. 最新音乐制作

### 音乐播放列表页面制作
1. 创建文件及相应路由
2. 根据route传来的params获取相应歌单的清单
3. 制作歌单页面上部信息
4. 制作内容区域
 + 放入路由占位符，出现请求头部信息
 + 制作歌曲列表页
 + 制作评论页
 + 制作收藏者页

### 视频页面制作
1. 视频和mv清单页面制作
2. 视频播放页面制作
3. mv播放页面制作
 + 与视频播放页面一致，但仅是采用的api不同，因此进行了合并

### 播放功能制作
1. 采用vuex，想法是
 + 将  正在播放的歌单、正播放的歌曲信息  放入状态管理
 + 将  切换歌曲、切换歌单、添加歌曲入播放列表  放入mutations属性
 + 因为请求用的api和传回的参数不尽相同，因此其他组件调用上述mutations属性时，需自行请求完数据，再进行调用并传递处理好的参数，而不是在vuex中进行请求
2. 实现
 + 从$store中调出当前即将播放的歌曲id，请求得到URL送入audio标签播放
 + 获取audio的dom，为dom贴上timeupdate事件，以获取已播放时长以及歌曲时长，并绑定到拖动条上



### 碰到的问题
1. 有些样式在当前页面内无法更改，甚至添加！important也没用，如何区分，如何变更
 + 有些样式可以在global.css中定义并更改，并在HTML文件中引入，原因尚需思考,如圆角按钮和方角按钮，一个需要！impotant才能改padding，一个不需要
2. 出现相同path，不同query的路由请求，却不触发跳转的情况
 + 在标签内添加：key属性，<router-view :key="$route.path"></router-view>，原因需了解
 + 音乐播放列表出现子路由变换，父组件却重新渲染的问题，原因在于上一条的：key属性，只要key值发生变动，父组件就会重新渲染，此时path中已经换了，导致无法根据path中的params按需（如，根据id找到歌单信息）请求静态资源，导致父组件渲染失败，暂时解决方法是让子路由带上父组件的params
3. 音乐清单页面需要优化的点是切换内容区域的不同模块时，都只需要加载一边，不要切一次加载一次，因此需要父子组件传值，或者用vuex

### 想法
1. 为了减少请求次数，歌单页面与其子路由清单页面利用父子组件传值