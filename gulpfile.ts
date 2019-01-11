import { GulpFile as Build, Task, Watch } from 'deploy-gulp'
import * as ts from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
import merge from 'merge2';
import { Gulp } from 'gulp'
import path from 'path';

@Build()
export class GulpFile {
    @Task()
    public build(watch: Watch) {
        watch.run(
            path.resolve(__dirname, 'src'),
            (gulp: Gulp) => {
                let tsResult = gulp
                    .src([path.join(__dirname, 'src/**/*.ts')])
                    .pipe(sourcemaps.init())
                    .pipe(ts.createProject('tsconfig.json')());
                return merge([
                    tsResult.dts.pipe(gulp.dest('./dist')),
                    tsResult.js.pipe(sourcemaps.write("./sourcemaps"))
                        .pipe(gulp.dest('./dist'))
                ]);
            }
        );
    }
}