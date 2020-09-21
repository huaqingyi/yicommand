import { CommanderCore, CoreClass, DI } from '../core';
import { textSync, Options } from 'figlet';

export type ContextRT = string | Promise<string>;

// tslint:disable-next-line:interface-name
export interface CommanderOption extends Options {
    context: ContextRT | ((...props: any[]) => ContextRT);
    version: ContextRT | ((...props: any[]) => ContextRT);
    color?: any;
}

export function Commander<Y extends CoreClass<YCommander>>(target: Y): Y;
export function Commander(config: CommanderOption): <Y extends CoreClass<YCommander>>(target: Y) => Y;
export function Commander(props: any) {
    if (props._root && props._root() === YCommander) {
        DI.commanders.push(props);
        return props;
    }
    return function warpper<Y extends CoreClass<YCommander>>(target: Y) {
        DI.commanders.push(target);
        return target;
    };
}

export function BootCommander(config: CommanderOption) {
    return function warpper<Y extends CoreClass<YCommander>>(target: Y) {
        DI.bootstrap(config, target);
        return target;
    };
}

export class YCommander<T = any> extends CommanderCore {

    public get _root() {
        return YCommander;
    }
    public static _root() {
        return YCommander;
    }

    public actions!: Array<{
        action: (...props: any[]) => any;
        description: string; name: string;
        children?: boolean;
    }>;
    public options!: { [key: string]: { description: string; required: boolean; } };

    public readonly action!: (...props: any[]) => any;

    protected ctx: T;

    constructor(...props: any[]);
    constructor(ctx: T) {
        super();
        this.ctx = ctx;
    }
}
