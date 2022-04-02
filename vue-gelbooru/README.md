# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


## Todo

- [x]  登录

- [x] 收藏

## 可以优化的点

**图片懒加载 margin-bottom**

需要设置 `IntersectionObserver` 的 root，但是切换搜索的时候 root 会丢失，暂时没有很优雅的解决方法

**无限滚动列表优化**

减少了后端返回数据的字段后性能得到了部分提升，但是限制 DOM 数量的根本问题还是没解决。

**图片加载placeholder**

~~上网找找素材~~
