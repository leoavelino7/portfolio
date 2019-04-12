"use strict";
/* Imports */
let gulp            = require("gulp"),
    sass            = require("gulp-sass"),
    autoprefixer    = require("gulp-autoprefixer"),
    cleanCSS        = require("gulp-clean-css"),
    ts              = require("gulp-typescript"),
    merge           = require("merge2");

/* Path scripts */
const ENTRY = './src/',
    OUTPUT = './public/';

const PATH ={
    sass: {
        entry: `${ENTRY}/scss`,
        output: `${OUTPUT}/css`
    },
    ts: {
        entry: `${ENTRY}/ts`,
        output: `${OUTPUT}/js`
    }
}

/* Config SASS */
sass.compiler = require("node-sass");

gulp.task("sass", () => {
    return gulp.src(`${PATH.sass.entry}/*.scss`)
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(PATH.sass.output));
});

/* Config TypeScript */
gulp.task("ts", () => {
    let tsResult = gulp.src(`${PATH.ts.entry}/*.ts`)
        .pipe(ts({
            declaration: true,
            charset: 'UTF-8',
            removeComments: true
        }));
    
    return merge([
        tsResult.dts.pipe(gulp.dest(`${PATH.ts.entry}/definitions`)),
        tsResult.js.pipe(gulp.dest(PATH.ts.output))
    ]);
});

/* Watch */
gulp.task("project:watch", () => {
    gylp.watch(`${PATH.sass.entry}/*.scss`, gulp.series("sass"));
    gylp.watch(`${PATH.ts.entry}/*.ts`, gulp.series("ts"));
});