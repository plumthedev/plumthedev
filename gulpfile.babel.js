import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import gulp from 'gulp';
import panini from 'panini';
import rimraf from 'rimraf';
import yaml from 'js-yaml';
import fs from 'fs';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import named from 'vinyl-named';
import autoprefixer from 'autoprefixer';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';

class Gulp {
    constructor() {
        this.plugins = plugins();
        this.isProduction = !!yargs.argv.production;
        this.configuration = yaml.load(fs.readFileSync('config.yml', 'utf8'));
    }

    static registerTask(taskName, taskCallback) {
        gulp.task(
            taskName,
            taskCallback(),
        );
    }

    static paniniRefreshPages(callback) {
        panini.refresh();
        callback();
    }

    removeBuildDirectory(callback) {
        rimraf(this.configuration.paths.build.main, callback);
    }

    buildPages() {
        return gulp
            .src(this.configuration.paths.source.pages)
            .pipe(
                panini(this.configuration.modules.panini),
            )
            .pipe(
                htmlmin({
                    collapseWhitespace: true,
                }),
            )
            .pipe(
                gulp.dest(this.configuration.paths.build.pages),
            );
    }

    buildJavaScript() {
        return gulp
            .src(this.configuration.paths.source.javascript)
            .pipe(named())
            .pipe(this.plugins.sourcemaps.init())
            .pipe(webpackStream(this.retriveWebpackConfiguration(), webpack))
            .pipe(
                this.plugins.if(
                    this.isProduction,
                    this.plugins.uglify()
                        .on('error', (e) => {
                            throw new Error(e);
                        }),
                ),
            )
            .pipe(this.plugins.if(!this.isProduction, this.plugins.sourcemaps.write()))
            .pipe(
                gulp.dest(this.configuration.paths.build.javascript),
            );
    }

    preprocessImages() {
        return gulp
            .src(
                this.configuration.paths.source.images,
            )
            .pipe(
                this.plugins.if(
                    this.isProduction,
                    this.plugins.imagemin([
                        this.plugins.imagemin.jpegtran({
                            optimizationLevel: 3,
                            progressive: true,
                            interlaced: true,
                        }),
                    ]),
                ),
            )
            .pipe(
                gulp.dest(this.configuration.paths.build.images),
            );
    }

    copyAssets() {
        return gulp
            .src(
                this.configuration.paths.source.assets,
            )
            .pipe(
                gulp.dest(
                    this.configuration.paths.build.assets,
                ),
            );
    }

    copyGitHubCNAME() {
        return gulp
            .src(
                this.configuration.paths.source.github.cname,
            )
            .pipe(
                gulp.dest(
                    this.configuration.paths.build.main,
                ),
            );
    }

    buildScss() {
        return gulp
            .src(
                this.configuration.paths.source.scss,
            )
            .pipe(
                this.plugins.sourcemaps.init(),
            )
            .pipe(
                this.plugins.sass({
                    includePaths: this.configuration.paths.scssDependencies,
                })
                    .on('error', this.plugins.sass.logError),
            )
            .pipe(
                this.plugins.postcss(this.retrivePostCssConfiguration()),
            )
            .pipe(
                this.plugins.if(this.isProduction,
                    this.plugins.cleanCss({
                        compatibility: 'ie9',
                    })),
            )
            .pipe(
                this.plugins.if(!this.isProduction, this.plugins.sourcemaps.write()),
            )
            .pipe(
                cleanCSS({
                    compatibility: 'ie8',
                }),
            )
            .pipe(
                gulp.dest(
                    this.configuration.paths.build.css,
                ),
            )
            .pipe(
                browser.reload({
                    stream: true,
                }),
            );
    }

    runServer(callback) {
        browser.init({
            server: this.configuration.server.contentBase,
            port: this.configuration.server.port,
        }, callback);
    }

    watchAssets() {
        gulp.watch(
            this.configuration.paths.watcher.assets,
            this.copyAssets.bind(this),
        );
    }

    watchPages() {
        gulp
            .watch(
                this.configuration.paths.watcher.pages,
            )
            .on('all', gulp.series(this.buildPages.bind(this), browser.reload));
        gulp
            .watch(
                this.configuration.paths.watcher.pagesComponents,
            )
            .on('all', gulp.series(Gulp.paniniRefreshPages, this.buildPages.bind(this), browser.reload));
        gulp
            .watch(
                this.configuration.paths.watcher.pagesData,
            )
            .on('all', gulp.series(Gulp.paniniRefreshPages, this.buildPages.bind(this), browser.reload));
    }

    watchJavaScripts() {
        gulp
            .watch(
                this.configuration.paths.watcher.javascript,
            )
            .on('all', gulp.series(this.buildJavaScript.bind(this), browser.reload));
    }

    watchScss() {
        gulp
            .watch(
                this.configuration.paths.watcher.scss,
            )
            .on('all', this.buildScss.bind(this));
    }

    watchImages() {
        gulp
            .watch(
                this.configuration.paths.watcher.images,
            )
            .on('all', gulp.series(this.preprocessImages.bind(this), browser.reload));
    }

    watchers() {
        this.watchAssets();
        this.watchPages();
        this.watchJavaScripts();
        this.watchScss();
        this.watchImages();
    }

    buildTask() {
        return gulp.series(
            this.removeBuildDirectory.bind(this),
            gulp.parallel(
                this.buildPages.bind(this),
                this.buildJavaScript.bind(this),
                this.preprocessImages.bind(this),
                this.copyAssets.bind(this),
                this.copyGitHubCNAME.bind(this),
            ),
            this.buildScss.bind(this),
        );
    }

    defaultTask() {
        return gulp.series('build', this.runServer.bind(this), this.watchers.bind(this));
    }

    // eslint-disable-next-line class-methods-use-this
    retrivePostCssConfiguration() {
        return [
            autoprefixer(),
        ].filter(Boolean);
    }

    retriveWebpackConfiguration() {
        return {
            mode: this.isProduction ? 'production' : 'development',
            module: {
                rules: [
                    {
                        test: /\.(js|jsx|tsx|ts)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                    },
                ],
            },
            resolve: {
                extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
            },
            devtool: !this.isProduction && 'source-map',
        };
    }

    run() {
        this.registerTasks();
    }

    registerTasks() {
        Gulp.registerTask('build', this.buildTask.bind(this));
        Gulp.registerTask('default', this.defaultTask.bind(this));
    }
}

const gulpTaskRunner = new Gulp();
gulpTaskRunner.run();
