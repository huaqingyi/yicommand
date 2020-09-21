import { CommanderOption, YCommander } from '../decorators/commander';
import commander from 'commander';
export interface CoreImpl {
    input(...props: any[]): void;
    input<T>(...props: any[]): T;
    output(...props: any[]): void;
    output<T>(...props: any[]): T;
}
export declare class CommanderCore implements CoreImpl {
    input(...props: any[]): void;
    output(...props: any[]): void;
}
export declare type CoreClass<Y> = (new (...args: any[]) => Y & CommanderCore) & typeof CommanderCore;
export declare class DICore {
    commanders: Array<CoreClass<CommanderCore>>;
    constructor();
    proxyClass(target: any, ctx: any, config?: any): any;
    mappingCommander(target: any, program: commander.Command, ctx?: any): Promise<commander.Command[]>;
    formatTypes(type: any, name: string): string;
    bootstrap(config: CommanderOption, target: CoreClass<YCommander>): Promise<void>;
}
export declare const DI: DICore;
