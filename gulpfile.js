var gulp = require('gulp'); // gulp基础库
var jshint = require('gulp-jshint');    // js检查
var concat = require('gulp-concat');    // 合并文件
var uglify = require('gulp-uglify');    // js压缩
var rename = require('gulp-rename');    // 文件重命名
var notify = require('gulp-notify');    // 提示
var babel = require('gulp-babel');      // 转成es5语法

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    gulp.start('backend', 'frontend', 'polyfill');
});

// 合并backend
gulp.task('backend', function() {
    gulp.src('src/backend/*.js')   // 选择合并的js
        .pipe(jshint()) // 检查js
        .pipe(jshint.reporter('jshint-stylish')) // 输出错误 默认样式为default

        .pipe(concat('backend.js'))    // 合并js
        .pipe(gulp.dest('dist/'))   // 输出 backend.js

        .pipe(rename({suffix:'.min'}))  // 重命名
        // .pipe(babel({presets:['@babel/env']})) // 将es6转成es5
        .pipe(uglify()) // 压缩
        .pipe(gulp.dest('dist/'))  // 输出 backend.min.js

        .pipe(notify({message:'生成文件：\ndist/backend.js\ndist/backend.min.js。'}));    // 提示成功
});

// 合并frontend
gulp.task('frontend', function() {
    gulp.src('src/frontend/*.js')   // 选择合并的js
        .pipe(jshint()) // 检查js
        .pipe(jshint.reporter('jshint-stylish')) // 输出错误 默认样式为default

        .pipe(concat('frontend.js'))    // 合并js
        .pipe(gulp.dest('dist/'))   // 输出 frontend.js

        .pipe(rename({suffix:'.min'}))  // 重命名
        // .pipe(babel({presets:['@babel/env']})) // 将es6转成es5
        .pipe(uglify()) // 压缩
        .pipe(gulp.dest('dist/'))  // 输出 frontend.min.js

        .pipe(notify({message:'生成文件：\ndist/frontend.js\ndist/frontend.min.js。'}));    // 提示成功
});

// 合并polyfill
gulp.task('polyfill', function() {
    gulp.src('src/polyfill/*.js')   // 选择合并的js
        .pipe(jshint()) // 检查js
        .pipe(jshint.reporter('jshint-stylish')) // 输出错误 默认样式为default

        .pipe(concat('polyfill.js'))    // 合并js
        .pipe(gulp.dest('dist/'))   // 输出 polyfill.js

        .pipe(rename({suffix:'.min'}))  // 重命名
        // .pipe(babel({presets:['@babel/env']})) // 将es6转成es5
        .pipe(uglify()) // 压缩
        .pipe(gulp.dest('dist/'))  // 输出 polyfill.min.js

        .pipe(notify({message:'生成文件：\ndist/polyfill.js\ndist/polyfill.min.js。'}));    // 提示成功
});

// gulp.task('default', ['polyfill']);  等价于 default task 里 gulp.start('polyfill')
