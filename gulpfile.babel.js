"use strict";

import plugins from "gulp-load-plugins";
import yargs from "yargs";
import browser from "browser-sync";
import gulp from "gulp";
import panini from "panini";
import rimraf from "rimraf";
import yaml from "js-yaml";
import fs from "fs";
import webpackStream from "webpack-stream";
import webpack2 from "webpack";
import named from "vinyl-named";
import autoprefixer from "autoprefixer";
import htmlmin from "gulp-htmlmin";
import cleanCSS from "gulp-clean-css";
import WorkboxPlugin from 'workbox-webpack-plugin';
// import sherpa from "style-sherpa";
// import uncss         from 'uncss';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!yargs.argv.production;

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
   let ymlFile = fs.readFileSync("config.yml", "utf8");
   return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task(
   "build",
   gulp.series(
      clean,
      gulp.parallel(pages, javascript, images, copy),
      sass
      // styleGuide
   )
);

// Build the site, run the server, and watch for file changes
gulp.task("default", gulp.series("build", server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
   rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
   return gulp.src(PATHS.assets).pipe(gulp.dest(PATHS.dist + "/assets"));
}

// Copy page templates into finished HTML files
function pages() {
   return gulp
      .src("src/pages/**/*.{html,hbs,handlebars}")
      .pipe(
         panini({
            root: "src/pages/",
            layouts: "src/layouts/",
            partials: "src/partials/",
            data: "src/data/",
            helpers: "src/helpers/"
         })
      )
      .pipe(
         htmlmin({
            collapseWhitespace: true
         })
      )
      .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
   panini.refresh();
   done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
   sherpa(
      "src/styleguide/index.md",
      {
         output: PATHS.dist + "/styleguide.html",
         template: "src/styleguide/template.html"
      },
      done
   );
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
   const postCssPlugins = [
      // Autoprefixer
      autoprefixer({ browsers: COMPATIBILITY })

      // UnCSS - Uncomment to remove unused styles in production
      // PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),
   ].filter(Boolean);

   return gulp
      .src("src/scss/main.scss")
      .pipe($.sourcemaps.init())
      .pipe(
         $.sass({
            includePaths: PATHS.sass
         }).on("error", $.sass.logError)
      )
      .pipe($.postcss(postCssPlugins))
      .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: "ie9" })))
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(gulp.dest(PATHS.dist + "/assets/css"))
      .pipe(browser.reload({ stream: true }));
}

let webpackConfig = {
   mode: PRODUCTION ? "production" : "development",
   module: {
      rules: [
         {
            test: /\.js$/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-env"],
                  compact: false
               }
            }
         }
      ]
   },
   plugins: [
      new WorkboxPlugin.GenerateSW({
         runtimeCaching: [{
           urlPattern: /\.(?:png|jpg|jpeg|svg|html|css|js)$/,
           handler: 'CacheFirst',
           options: {
             cacheName: 'plumthedev',
             expiration: {
               maxEntries: 50,
             },
           },
         }],
       })
   ],
   devtool: !PRODUCTION && "source-map"
};

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
   return gulp
      .src(PATHS.entries)
      .pipe(named())
      .pipe($.sourcemaps.init())
      .pipe(webpackStream(webpackConfig, webpack2))
      // .pipe(
      //    $.if(
      //       PRODUCTION,
      //       $.uglify().on("error", e => {
      //          console.log(e);
      //       })
      //    )
      // )
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
      .pipe(gulp.dest(PATHS.dist + "/assets/js"));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
   return gulp
      .src("src/images/**/*")
      .pipe(
         $.if(
            PRODUCTION,
            $.imagemin([
               $.imagemin.jpegtran({
                  optimizationLevel: 3,
                  progressive: true,
                  interlaced: true
               })
            ])
         )
      )
      .pipe(gulp.dest(PATHS.dist + "/assets/images"));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
   browser.init(
      {
         startPath: '/pl',
         server: PATHS.dist,
         port: PORT
      },
      done
   );
}

// Reload the browser with BrowserSync
function reload(done) {
   browser.reload();
   done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
   gulp.watch(PATHS.assets, copy);
   gulp
      .watch("src/pages/**/*.html")
      .on("all", gulp.series(pages, browser.reload));
   gulp
      .watch("src/{layouts,partials}/**/*.html")
      .on("all", gulp.series(resetPages, pages, browser.reload));
   gulp
      .watch("src/data/**/*.{js,json,yml}")
      .on("all", gulp.series(resetPages, pages, browser.reload));
   gulp
      .watch("src/helpers/**/*.js")
      .on("all", gulp.series(resetPages, pages, browser.reload));
   gulp.watch("src/scss/**/*.scss").on("all", sass);
   gulp
      .watch("src/scripts/**/*.js")
      .on("all", gulp.series(javascript, browser.reload));
   gulp
      .watch("src/assets/images/**/*")
      .on("all", gulp.series(images, browser.reload));
   // gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, browser.reload));
}
