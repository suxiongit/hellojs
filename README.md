# hellojs
这是一个js项目，实现各种扩展。

使用gulp工具进行项目中文件的压缩合并。

## 创建项目步骤

执行以下命令生成package.js文件：

```
$ npm init
```

### gulp

全局安装 gulp：

```
$ npm install --global gulp
```

项目开发依赖安装：

```
$ npm install --save-dev gulp
```

安装 gulp 插件：

```
$ npm install --save-dev gulp-concat # 合并文件
$ npm install --save-dev gulp-uglify # js压缩
$ npm install --save-dev gulp-rename # 文件重命名
$ npm install --save-dev gulp-notify # 提示

$ npm install --save-dev jshint gulp-jshint # js检查
$ npm install --save-dev jshint-stylish # js检查信息样式

# gulp对于es6的语法压缩是有问题的
# 如果有es6语法，需要先用 gulp-babel 编译一下再uglify
$ npm install --save-dev gulp-babel @babel/core @babel/preset-env # 将es6转成es5
```

## 初始化项目

安装依赖包

```
$ npm install
```
