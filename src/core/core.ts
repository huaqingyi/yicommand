import { isFunction, map } from 'lodash';
import { CommanderOption, YCommander } from '../decorators/commander';
import commander, { command, createCommand } from 'commander';
import colors from 'colors';
import { textSync } from 'figlet';

// tslint:disable-next-line:interface-name
export interface CoreImpl {
    input(...props: any[]): void;
    input<T>(...props: any[]): T;
    output(...props: any[]): void;
    output<T>(...props: any[]): T;
}

// tslint:disable-next-line:max-classes-per-file
export class CommanderCore implements CoreImpl {

    public input(...props: any[]) {
        throw new Error(`not extends input ...`);
    }

    public output(...props: any[]) {
        throw new Error(`not extends output ...`);
    }
}

export type CoreClass<Y> = (new (...args: any[]) => Y & CommanderCore) & typeof CommanderCore;

// tslint:disable-next-line:max-classes-per-file
export class DICore {
    public commanders: Array<CoreClass<CommanderCore>>;

    constructor() {
        this.commanders = [];
    }

    public proxyClass(target: any, ctx: any, config: any = {}) {
        return new Proxy(new target(ctx), {
            get(t: any, name: string) {
                if (t[name]) { return t[name]; }
                const type = Reflect.getMetadata('design:type', t, name);
                const value = config[name];
                if (type === Array && typeof (value) === 'string') {
                    return value.split(',');
                }
                return value;
            },
            set(t: any, name: string, value: any) {
                t[name] = value;
                return true;
            }
        });
    }

    public async mappingCommander(target: any, program: commander.Command, ctx: any = {}) {
        const comm: YCommander = target.prototype;

        map(comm.options, (desc, key) => {
            const type = Reflect.getMetadata('design:type', comm, key);
            if (desc.required === false) {
                return program.option(
                    `-${key.substring(0, 1)}, --${key} ${this.formatTypes(type, key)}`, desc.description
                );
            } else {
                return program.requiredOption(
                    `-${key.substring(0, 1)}, --${key} ${this.formatTypes(type, key)}`, desc.description
                );
            }
        });

        return await Promise.all(map(comm.actions, async (a) => {
            const cs = command(a.name);
            cs.description(a.description);
            if (a.children === true) {
                const returntype = await a.action.apply(comm);
                const idx = this.commanders.indexOf(returntype);
                if (idx !== -1) {
                    await this.mappingCommander(returntype, cs, this.proxyClass(target, program, program));
                } else {
                    throw new Error(`子命令绑定错误: ${target.name}->${a.name}->${returntype.name} ...`);
                }
            } else {
                cs.action((config: any) => {
                    const commIns = this.proxyClass(target, ctx, config.parent || {});
                    return a.action.apply(commIns, [commIns]);
                });
            }
            return program.addCommand(cs);
        }));
    }

    public formatTypes(type: any, name: string) {
        switch (type) {
            case String: return `<${name}>`;
            case Array: return `[${name}]`;
            default: return `<${name}>`;
        }
    }

    public async bootstrap(config: CommanderOption, target: CoreClass<YCommander>) {

        let text = await config.context;
        if (isFunction(config.context)) { text = await config.context(); }
        console.log((colors as any)[config.color || 'red'](await textSync(text as string, config)));

        const v = isFunction(config.version) ? await config.version() : await config.version;
        const program = createCommand();
        program.version(v);
        await this.mappingCommander(target, program);
        await program.parse(process.argv);
    }
}

export const DI = new DICore();
