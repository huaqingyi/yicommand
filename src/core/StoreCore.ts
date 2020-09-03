import colors from 'colors'
import { CommandOptions } from '../decorators'
import { TaskOptions } from '../decorators/Task'
import program from 'commander';
import figlet from 'figlet'
import _ from 'lodash'

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});

export class StoreCore {
    public static _this: StoreCore;

    public static register(): StoreCore {
        if (!StoreCore._this) StoreCore._this = new this;
        return StoreCore._this;
    }

    private tasksOpt: { [key: string]: TaskOptions | undefined };
    private execsOpt: { [key: string]: { context: string; description?: string } };
    private argsOpt: { [key: string]: string };

    constructor() {
        this.tasksOpt = {};
        this.execsOpt = {};
        this.argsOpt = {};
    }

    async command(constructor: any, context?: CommandOptions) {
        let c: CommandOptions = { version: '1.0.0' }
        if (context) c = context;
        await new Promise(r => {
            if (c.context) {
                figlet(c.context, (err, data) => {
                    if (err) {
                        console.log((<any>'Something went wrong...').error);
                        console.dir(err);
                    } else {
                        console.log((<any>data)[c.color || 'red']);
                        r(data);
                    }
                })
            } else {
                r(true)
            }
        })
        let mode = new (<any>constructor);

        await program.version(c.version);
        await _.map(this.execsOpt, (v, k) => {
            if (v.description) {
                program.command(v.context).description(v.description).action((...args: any[]) => mode[k].apply(mode, args));
            } else {
                program.command(v.context).action((...args: any[]) => mode[k].apply(mode, args));
            }
        });

        await _.map(this.argsOpt, (v, k) => {
            program.arguments(v).action((...args: any[]) => mode[k].apply(mode, args));
        });

        await _.map(this.tasksOpt, (opt, key) => {
            let option = `-${key.slice(0, 1)}, --${key} [${key}]`;
            program.option(option, opt && opt.explain);
        });

        await program.parse(process.argv);

        return await _.map(this.tasksOpt, (opt, key) => {
            if (program[key]) mode[key].apply(mode, [program[key]]);
        });
    }

    execs(method: string, context: string, description?: string) {
        this.execsOpt[method] = { context, description };
    }

    tasks(method: string, context?: TaskOptions) {
        this.tasksOpt = {
            ...this.tasksOpt,
            [method]: context
        }
    }

    args(methods: string, context: string) {
        this.argsOpt[methods] = context;
    }
}