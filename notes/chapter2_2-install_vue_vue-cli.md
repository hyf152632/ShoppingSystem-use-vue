Vue多页面应用文件引入
<script src="https://.../vue.js"></script>
vue-cli构建SPA应用
* npm install -g vue-cli
* vue init toolName projectName
官方构建工具5套
vue init webpack myproject
vue init webpack-simple
vue init browserify
vue init browserify-simple
simple

项目文件：
package.json:
  dependenit——————项目依赖的包
  Devdependent——————开发项目所依赖的包

  配置文件：
build/webpack.base.conf.js &
config/index.js
  是可以合并的，但是为了清晰拆开了。
  
  bulid.js
  开发生产包