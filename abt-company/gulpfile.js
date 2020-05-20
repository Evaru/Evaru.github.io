const gulp = require("gulp");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

const paths = {
  css: {
    src: "src/css/**/*.scss",
    dest: "public/css/"
  },
  js: {
    src: "src/js/scripts/**/*.js",
    dest: "public/js/scripts/"
  },
  myJs: {
    src: "src/js/myScript/**/*.js",
    dest: "public/js/myScript"
  },
  img: {
    src: "src/img/**/*.{jpg,jpeg,gif,png,svg,JPG,ico}",
    dest: "public/img/"
  },
  html: {
    src: "src/**/*.html",
    dest: "public"
  },
  fonts: {
    src: "src/fonts/**/*.{ttf,otf}",
    dest: "public/fonts"
  }
};

function cleanFile(){
  return gulp.src("public/*", { read: false }).pipe(clean())
}

function scssFile() {
  return gulp
    .src(paths.css.src)
    .pipe(scss())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css.dest));
}

function imgFile() {
  return gulp
    .src(paths.img.src)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest(paths.img.dest));
}

function jsFile() {
  return gulp.src(paths.js.src).pipe(gulp.dest(paths.js.dest));
}

function myJs() {
  return gulp
    .src(paths.myJs.src)
    .pipe(concat("myScripts.js"))
    .pipe(gulp.dest(paths.myJs.dest))
    .pipe(rename('myScripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.myJs.dest));
}

function htmlFile() {
  return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
}

function fontsFile() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

function reload(done) {
  browserSync.reload();
  done();
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: "public/"
    }
  });
  done();
}

function watchFiles() {
  gulp.watch("src/css/**/*.scss", gulp.series(scssFile, reload));
  gulp.watch("src/js/scripts/**/*.js", gulp.series(jsFile, reload));
  gulp.watch("src/js/myScript/**/*.js", gulp.series(myJs, reload));
  gulp.watch("src/**/*.html", gulp.series(htmlFile, reload));
  gulp.watch(
    "src/img/**/*.{jpg,jpeg,gif,png,svg,JPG,ico}",
    gulp.series(imgFile, reload)
  );
  gulp.watch("src/fonts/**/*.{ttf,otf}", gulp.series(fontsFile, reload));
}

const build = gulp.series(
  gulp.parallel(scssFile, jsFile,myJs, htmlFile, imgFile, fontsFile),
  serve,
  watchFiles
);

exports.default =gulp.series(cleanFile, build);
