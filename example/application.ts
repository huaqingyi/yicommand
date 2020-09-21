import { YCommander, BootCommander, option, Action, Children } from '../src';
import { ConnCommander } from './conn';

@BootCommander({
    context: `Test Commander ...`,
    version: `1.0.0`,
})
export class Application extends YCommander {

    @option(`传入文件路径数组`)
    public files!: string[];

    @option
    public des!: string;

    @Action(`测试命令 ...`)
    public test() {
        console.log(this.files);
        console.log(this.des);
    }

    @Children
    public conn() {
        return ConnCommander;
    }
}
