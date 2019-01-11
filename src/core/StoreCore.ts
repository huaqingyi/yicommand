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

    constructor() {
        this.tasksOpt = {};
    }

    command(constructor: Function, context?: CommandOptions) {
        let c: CommandOptions = { version: '1.0.0' }
        if (context) c = context;
        return new Promise(r => {
            if (c.context) {
                figlet(c.context, (err, data) => {
                    if (err) {
                        console.log('Something went wrong...'.error);
                        console.dir(err);
                    } else {
                        console.log((<string>data)[c.color || 'red']);
                        r(data);
                    }
                })
            } else {
                r(true)
            }
        }).then(resp => {
            program.version(c.version);
            return _.map(this.tasksOpt, (opt, key) => {
                let opts = '';
                if (opt && opt.option) {
                    if (_.isArray(opt.option)) opts = opt.option.join(',')
                    else opts = opt.option;
                    if (opts) opts = `[${opts}]`
                }
                let option = `-${key.slice(0, 1)}, --${key} ${opts}`;
                program.option(option, opt && opt.explain);
            });
        }).then(resp => {
            program.parse(process.argv);
            let mode = new (<any>constructor);
            return _.map(this.tasksOpt, (opt, key) => {
                if (program[key]) mode[key](program[key]);
            });
        });
    }

    tasks(method: string, context?: TaskOptions) {
        this.tasksOpt = {
            ...this.tasksOpt,
            [method]: context
        }
    }
}