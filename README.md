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
```

## 初始化项目

安装依赖包

```
$ npm install
```
