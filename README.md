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