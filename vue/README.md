
```
/
|—— admin     // 后台管理系统模版，包括路由权限，和登陆
├── admin-nologin-nopermiss   // 基于simple-admin改造，去掉了登陆和权限
├── admin-test  // 基于admin-nologin-nopermiss改造，样式已调整过，从公司上线项目中抽离出来的系统模版
|—— simple-page  // 普通vue页面开发模版，没有ui框架，只有vue，vue-router, axios               


```

1. admin-*三者的具体区别：

- `admin`和`admin-nologin-nopermiss` 的区别就是：去掉了登陆和用户权限功能，别的一点区别都没有
- `admin、admin-nologin-nopermiss`和`admin-test`的区别是：admin-test同样没有登陆和用户权限功能，但是因是从上线项目中抽离出来的模版，所以从样式，到一些配置都更加符合公司的要求。
  - 比如样式方面：侧边栏和顶部导航样式修改，icon使用ionicons字体图标, 盒子阴影等
  - 配置：添加了代理请求的配置，添加了broswersync插件的支持

2. 