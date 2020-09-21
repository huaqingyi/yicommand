## CLI 开发神器
### YI Command 上手简单 npm i yicommand --save

```
root$ ts-node example/application.ts -h
  _____         _      ____                                          _                   
 |_   _|__  ___| |_   / ___|___  _ __ ___  _ __ ___   __ _ _ __   __| | ___ _ __         
   | |/ _ \/ __| __| | |   / _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` |/ _ \ '__|        
   | |  __/\__ \ |_  | |__| (_) | | | | | | | | | | | (_| | | | | (_| |  __/ |     _ _ _ 
   |_|\___||___/\__|  \____\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|\___|_|    (_|_|_)
                                                                                         
Usage: application [options] [command]

Options:
  -V, --version        output the version number
  -f, --files [files]  传入文件路径数组
  -d, --des <des>      pleace input des
  -h, --help           display help for command

Commands:
  test                 测试命令 ...
  conn [options]       pleace execute children conn ...
  help [command]       display help for command
```

* 命令入口 src/index.ts
```
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
```

* 子命令 src/conn/index.ts
```
import { Commander, option, YCommander, Action } from '../../src';
import { Application } from '../application';

@Commander
export class ConnCommander extends YCommander<Application> {

    @option
    public ops!: string[];

    @option
    public names!: string;

    @Action
    public test() {
        console.log(this.ctx.files, this.ctx.des);
        console.log(this.ops, this.names);
    }
}
```

## CTX 上下文 享受简单的传递 ...
