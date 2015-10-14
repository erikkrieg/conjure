var gulp = require("gulp"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	babel = require("gulp-babel"),
  	connect = require("gulp-connect"),
  	rimraf = require("gulp-rimraf"),
  	sass = require("gulp-sass");

var paths = {
	sass: "sass/**/*.scss",
	scripts: ["js/**/*.js", "src/**/*.js"]
};

var production = false;



// Server
//-----------------------------------------------------------------

gulp.task("connect", function() {
	connect.server({
		livereload: true
	});
});

gulp.task("html", function () {
	gulp.src("*.html")
		.pipe(connect.reload());
});


// Sass
//-----------------------------------------------------------------

gulp.task("sass", function () {
	gulp.src(paths.sass)
		.pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
		.pipe(gulp.dest("build/css"));
});



// Scripts
//-----------------------------------------------------------------

gulp.task("scripts", function() {
	var pipeline;

	if(!production){
		pipeline = gulp.src(paths.scripts)
			.pipe(babel({
				ignore: "js/"
			}))
		    .pipe(concat("main.min.js"))
		    .pipe(gulp.dest("build/js"));
	} else {
		pipeline = gulp.src(paths.scripts)
			.pipe(babel({
				ignore: "js/**/*.js"
			}))
	      	.pipe(uglify())
	      	.pipe(concat("main.min.js"))
		    .pipe(gulp.dest("build/js"));
	}

  return  pipeline;
});



// Watcher
//-----------------------------------------------------------------
 
gulp.task("watch", function () {
 	gulp.watch(["*.html"], ["html"]);
 	gulp.watch(paths.scripts, ["scripts"]);
 	gulp.watch(paths.sass, ["sass"]);
});
 


// Default Task
//-----------------------------------------------------------------

gulp.task("default", ["connect", "scripts", "sass", "watch"]);