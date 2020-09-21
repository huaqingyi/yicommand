import { CommanderCore, CoreClass } from '../core';
import { Options } from 'figlet';
export declare type ContextRT = string | Promise<string>;
export interface CommanderOption extends Options {
    context: ContextRT | ((...props: any[]) => ContextRT);
    version: ContextRT | ((...props: any[]) => ContextRT);
}
export declare function Commander<Y extends CoreClass<YCommander>>(target: Y): Y;
export declare function Commander(config: CommanderOption): <Y extends CoreClass<YCommander>>(target: Y) => Y;
export declare function BootCommander(config: CommanderOption): <Y extends CoreClass<YCommander<any>>>(target: Y) => Y;
export declare class YCommander<T = any> extends CommanderCore {
    get _root(): typeof YCommander;
    static _root(): typeof YCommander;
    actions: Array<{
        action: (...props: any[]) => any;
        description: string;
        name: string;
        children?: boolean;
    }>;
    options: {
        [key: string]: {
            description: string;
            required: boolean;
        };
    };
    readonly action: (...props: any[]) => any;
    protected ctx: T;
    constructor(...props: any[]);
}
