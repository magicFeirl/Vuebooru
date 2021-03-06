## Vuebooru

一个第三方 Gelbooru 网页版，功能包括：

1. 无限滚动加载数据
2. 单页浏览图片
3. 登录、查看收藏
4. 收藏/取消收藏图片、快捷键查看图片
5. 其他 Gelbooru 功能如点击 tag 跳转到对应搜索结果、搜索 tag...

**首页**

![](./images/1.JPG)

**查看图片**

![](./images/2.JPG)

### 部署

**后端**

需要 `Python3.7+`、安装第三方依赖库 `pip install -r requirements.txt`，windows 下运行 run.bat 启动后端。

**前端**

需要 node 环境，进入 `vue-gelbooru` 运行 `npm install`安装项目依赖，使用 `npm run dev` 本地运行，`npm run build` 打包前端。

### 技术栈

**后端**

后端本质上是 Gelbooru 部分 API 的反代实现，无需数据库，使用 `FastAPI` 框架。

**前端**

vite2 + vue3 + vuex + vue-router，vue 全家桶。

[tinykeys 键盘监听](https://github.com/jamiebuilds/tinykeys)

### 项目总结

一时兴起想写个网站提升 Gelbooru 的体验，项目前后端都是由我一人完成，现总结下写项目时遇到的问题以及一些收获。

**后端**

因为后端本质是个爬虫所以实际上并没有很多技术含量，FastAPI 有点忘不过看了官方文档后还是能快速解决问题的。唯一没有思路的是 Cookie 如何设置，因为之前写的项目用的是 JWT返回的数据是在接口里的，所以并没有了解 Cookie 的使用。查了 FastAPI 的 document 后照着写了点测试，实际上并没有很难。

解决了 Cookie 的问题后在测试登录接口的时候发现登录上去后再发登录请求接口就会返回用户未登录。根据 Gelbooru 的登陆接口返回数据，判断用户登录成功与否的依据是登录接口是否返回 Cookie，然而有一种特殊情况，就是用户携带 Cookie 访问 Gelbooru 的登陆接口，Gelbooru 会返回 302 且不会携带 Cookie（因为用户已经登陆了）。但是我写的接口并没有接受 Cookie 参数。进过排查后得出是 aiohttp session 请求登录后自动携带了返回的 Cookie，导致重复登录失败。解决方法是在 connector 里传入 `DummyCookie` 取消携带 Cookie 的行为。

**前端**

前端一开始并没有想写的很复杂，所以并不打算用 vue 全家桶。然而随着组件通信和页面加载行为的需求的增加，添加了 router 和 vuex。随着功能和组件的添加，代码变得越来越耦合，虽然功能都实现了，但是并不优雅。感觉这是我写 vue 项目一直以来的通病。

回到功能本身，这次加载数据的方式还是无限滚动。最开始没有简化接口的返回内容导致返回的数据中有很多没用上，而随着页面的加载越来越多无用的数据被添加，最后会使页面相当卡顿。除了简化接口返回内容外，还尝试用虚拟列表优化性能，然而并没有找到合适的轮子（这时页面基本已经定型），也不会写轮子，所以这部分还是有待优化。

然后是图片懒加载，这方面用的是自定义指令 + `IntersectionObserver`，对于 `IntersectionObserver` 的配置，预想是图片距离进入视口一段距离时加载，但是默认情况下并不能生效。原因是 `IntersectionObserver`  的 rootMargin 配置只会在 root 指定为 `image element` 的直接父元素时才能生效。而 Vue 里面更新图片列表时图片父元素会被更新导致 root 配置失效。更优的解决方案或许是找轮子。
