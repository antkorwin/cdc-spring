var gulp = require('gulp');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
var autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');
var sourcemaps = require("gulp-sourcemaps");
var gutil = require("gulp-util");
var webpack = require("webpack");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var eslint = require('gulp-eslint');
var gcallback = require('gulp-callback');
var replace = require('gulp-replace');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var proxyMiddleware = require('http-proxy-middleware');
var insert = require('gulp-insert');
var reload = browserSync.reload;
var minifyCSS = require('gulp-minify-css');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var path = require('path');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var lodash = require('lodash');
var pump = require('pump');
const BabelEnginePlugin = require('babel-engine-plugin');
var tslint = require('gulp-tslint');

APPLICATION_DIST_PATH = "./dist";
APPLICATION_BROWSERSYNC_PORT = 3000;

var webpackSettings = (build = false) => {
    let plugins = [
        new webpack.optimize.OccurrenceOrderPlugin,
        new webpack.NoEmitOnErrorsPlugin(),
        new BabelEnginePlugin(
            {
                presets: ['env']
            },
            {
                verbose: false
            }
        )
    ];
    let entry = ['./src/app.jsx'];
    if (!build) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        entry.push("webpack-hot-middleware/client?reload=true");
    }
    return {
        entry: entry,
        mode: build ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: {
                        loader: "awesome-typescript-loader"
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015', 'stage-0', 'react']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: [
                        "babel-loader",
                        {
                            loader: "react-svg-loader",
                            options: {
                                svgo: {
                                    plugins: [
                                        { removeTitle: false }
                                    ],
                                    floatPrecision: 2
                                }
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        },
        plugins: plugins,
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    };
}

var webpackDevServerConfig = {
    publicPath: '/',
    quiet: false,
    noInfo: false,
    logLevel: 'error'
};

var errorHandler = function (title) {
    'use strict';

    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};

var buildStyles = function (serve = false) {
    var result = gulp.src(['src/**/*.scss'])
        .pipe($.sourcemaps.init())
        .pipe($.sass({ style: 'expanded' })).on('error', errorHandler('Sass'))
        .pipe($.autoprefixer()).on('error', errorHandler('Autoprefixer'));
    if (!serve) {
        result = result.pipe(minifyCSS());
    }
    result = result.pipe($.sourcemaps.write())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'));
    return result;
};

var minifyJs = function () {
    pump([
        gulp.src('./dist/*.js'),
        uglify(),
        gulp.dest('dist')
    ]);
}

var webPackBuild = function (minify = null, callback = null) {
    webpack(webpackSettings(!!minify), function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        if (typeof minify === 'function') {
            minify();
        }
        if (typeof callback === 'function') {
            callback();
        }
    });
};

var browserSyncInit = function (baseDir, browser, remote) {
    var argv = process.argv.slice(3); // forward args to protractor
    var index = -1;
    if (argv && argv.length) {
        index = lodash.findIndex(argv, el => el.indexOf('--appPort') > -1);
    }
    var appPort = null;
    if (index > -1) {
        appPort = argv[index].split('=')[1];
    }
    if (appPort) {
        APPLICATION_BROWSERSYNC_PORT = appPort;
    }

    browser = browser === undefined ? 'default' : browser;

    var server = {
        baseDir: baseDir
    };

    var target = remote ? 'http://192.168.0.8:3000' : 'http://localhost:8000';

    var bundler = webpack(webpackSettings());

    server.middleware = [
        webpackDevMiddleware(bundler, webpackDevServerConfig),
        webpackHotMiddleware(bundler),
        proxyMiddleware(['/task-service', '/report-service'], { target: target, onError: onProxyError, ws: true }),
        proxyMiddleware(['/app_config/config'], {
            target: 'http://localhost:' + APPLICATION_BROWSERSYNC_PORT,
            pathRewrite: { '^/app_config/config': '/assets/js/config.js' }
        })
    ];

    // баг на macOs, корректный ответ от прокси интерпритируется как ошибочный,
    // поэтому мы сами обрабатываем ошибку
    function onProxyError(err, req, res) {
        var host = (req.headers && req.headers.host);
        console.error('Error occured while trying to proxy to: ' + host + req.url + "/n" + err);
        res.end();
    }

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        port: APPLICATION_BROWSERSYNC_PORT,
        browser: browser
    });
}


var addVersion = function () {
    return gulp.src(['./dist/index.html'])
        .pipe(replace(new RegExp('.js"', 'g'), '.js?v=' + new Date().getTime() + '"'))
        .pipe(replace(new RegExp('.css"', 'g'), '.css?v=' + new Date().getTime() + '"'))
        .pipe(gulp.dest('./dist/'));
};

var configs = function () {
    var argv = process.argv.slice(3); // forward args to protractor
    var index = -1;
    if (argv && argv.length) {
        index = lodash.findIndex(argv, el => el.indexOf('--ip') > -1);
    }
    var ip = null;
    if (index > -1) {
        ip = argv[index].split('=')[1];
    }
    var result = gulp.src([
        './dist/assets/js/config.js'
    ]);
    if (ip) {
        result = result.pipe(insert.append(`var WS_GLOBAL_IP = '${ip}';`));
    }
    else {
        result = result.pipe(insert.append(`var WS_GLOBAL_IP = null;`));
    }
    return result.pipe(gulp.dest('./dist/assets/js'));
};


/** GULP TASKS */


gulp.task('ts-lint', function () {
    return gulp.src(['./src/**/*.ts', './src/**/*.tsx', '!./src/**/*.spec.ts', '!./src/**/*.spec.tsx'])
        .pipe(tslint({
            program: require('tslint').Linter.createProgram("./tsconfig.json")
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});


gulp.task('lint', function () {
    return gulp.src(['./src/**/*.js', './src/**/*.jsx'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('index', function () {
    return gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./dist'))
        .pipe(gcallback(function () {
            addVersion();
        }))
});

gulp.task('sass:serve', function () {
    return buildStyles(true);
});

gulp.task('sass', function () {
    return buildStyles();
});

gulp.task('styles-reload', ['sass:serve'], function () {
    return buildStyles()
        .pipe(browserSync.stream());
});

gulp.task('js:serve', ['ts-lint', 'lint'], function () {
    return webPackBuild();
});

gulp.task('js', ['ts-lint', 'lint'], function () {
    return webPackBuild(minifyJs);
});

gulp.task('assets-files', function () {
    var flag = false;
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', ['styles-reload']);
    gulp.watch('src/**/*.{js,jsx,ts,tsx}', ['ts-lint', 'lint']);
});

gulp.task('build', ['index', 'assets-files', 'sass', 'js'], function () {
    configs();
});

gulp.task('build:serve', ['index', 'assets-files', 'sass:serve', 'js:serve'], function () {
    configs();
});

gulp.task('serve', ['build:serve', 'watch'], function () {
    browserSyncInit('./dist/');
});

gulp.task('serve:remote', ['build:serve', 'watch'], function () {
    browserSyncInit('./dist/', undefined, true);
});