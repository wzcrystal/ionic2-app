# 项目运行步骤
1. npm install 
2. ionic serve 
3. 打包开发环境：ionic build 
4. 打包正式环境：ionic build --prod 
5. 打包测试环境：npm run build-test 

# 项目src目录说明 
- app: 项目根组件内容，勿在里边添加其他的组件内容 
- assets: 项目静态资源
- config: 环境配置文件
- pages: 项目内容文件，存放项目不同模块的组件或服务。按模块划分，每个模块一个文件夹，每个模块有单独的模块文件，可根据需求决定每个模块一个服务文件或者每个组件一个服务文件。
- scripts: 项目会使用到的公共服务类文件或者工具类文件。此文件夹里边的内容不与组件或者模块内容挂钩，不为模块和组件内容而特制。(可根据项目需求增加或修改其中的内容。以下服务文件必须包含但不局限，服务文件的内容可随项目修改)
> - constant: constant.ts存放项目常量，但凡项目使用到的常量都定义到这个文件中。  
注：目前文件中只加了localstorage的key常量，项目中但凡涉及到本地存储的，不要在代码中出现字符串保存。比如在代码中调用local-storage.service服务中的set方法保存数据，假设LocalStorage的对象为local：
```angular2html
正确的做法：
this.local.set(LocalStorageKeys.TOKEN,'token值');

错误的做法：
this.local.set('token','token值');

这是为防止存储字段较多，导致团队开发的时候存储字段重复或忘记某一个内容的存储字段，从而要到代码中到处寻找。 
将存储字段定义到常量中时，也要注释好字段的意思，方便大家清楚的知道每个存储的字段key是什么，而不会混乱或重复。
```
> - filter: http.filter.ts 项目的http请求拦截文件。如果每个模块的http请求拦截不一致，则移步到每个模块去写拦截文件。
> - service: 服务文件  
           common.service.ts 存放工具方法，比如日期转换、数据为空判断等  
           loading.service.ts 页面加载的动画  
           local-storage.service.ts 数据存储本地localstorage的方法，如果代码中涉及数据存储本地，一概调用这个服务的方法处理，而不是直接window.localstorage  
- theme: variables.scss 项目的样式变量

