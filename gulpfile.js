"use strict";
/* Imports */
let gulp            = require("gulp"),
    sass            = require("gulp-sass"),
    autoprefixer    = require("gulp-autoprefixer"),
    cleanCSS        = require("gulp-clean-css"),
    ts              = require("gulp-typescript"),
    merge           = require("merge2");

/* Path scripts */
let entry   = "./src",
    output  = "./public";

/* Config SASS */
sass.compiler = require("node-sass");

gulp.task("sass", () => {
    return gulp.src(`${entry}/scss/*.scss`)
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(`${output}/css`));
});

/* Config TypeScript */
gulp.task("ts", () => {
    let tsResult = gulp.src(`${entry}/**/*.ts`)
        .pipe(ts({
            declaration: true,
            charset: 'UTF-8',
            removeComments: true
        }));
    
    return merge([
        tsResult.dts.pipe(gulp.dest(`${entry}/ts/definitions`)),
        tsResult.js.pipe(gulp.dest(`${output}/js`))
    ]);
});

/* Watch */
gulp.task("project:watch", () => {
    // gulp.watch(`${PATH.sass.entry}/*.scss`, gulp.series("sass"));
    // gulp.watch(`${PATH.ts.entry}/**/*.ts`, gulp.series("ts"));

    gulp.watch(`${entry}/**/*.scss`, gulp.series("sass"));
});