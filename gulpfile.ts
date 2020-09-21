import { GFile, Task, TSC } from 'gyi';
import { watch, series } from 'gulp';
import { remove, writeFile } from 'fs-extra';
import { exec } from 'shelljs';
import { join } from 'path';

@GFile
export class GulpFile {

    // 清除缓存
    @Task()
    public async del() {
        return await remove(join(__dirname, 'dist'));
    }

    // build 项目
    @Task({
        series: ['del']
    })
    public async build(tsc: TSC) {
        return await tsc.runtime([
            join(__dirname, 'src/**/*.ts'),
            join(__dirname, 'src/**/*.tsx')
        ] as any, join(__dirname, 'dist'));
    }

    // dev 模式 watch build
    @Task({ series: ['build'] })
    public async watch() {
        watch(join(__dirname, 'src/**/*.ts'), series('del', 'build'));
        watch(join(__dirname, 'src/**/*.tsx'), series('del', 'build'));
    }

    @Task()
    public async update() {
        const packageJSON = require('./package.json');
        return await new Promise(r => {
            const { version } = packageJSON;
            packageJSON.version = String(
                Number(version.split('.').join('')) + 1
            ).split('').join('.');
            writeFile('package.json', JSON.stringify(packageJSON, null, '\t'), r);
        });
    }

    // 发布
    @Task({
        series: ['update']
    })
    public async publish(tsc: TSC) {
        const watcher = await this.build(tsc);
        watcher.end(async () => {
            await console.log('开始提交 git ...');
            await console.log(exec('git add -A && git commit -a -m "publish update" && git push').stdout);
            await console.log('开始发布 ...');
            await console.log(exec('npm publish --registry=http://registry.talefun.com:4873/').stdout);
            await console.log('publish success ...');
        });
    }
}
