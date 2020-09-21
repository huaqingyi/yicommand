import { YCommander } from './command';
export declare function option(target: YCommander, attrKey: string): void;
export declare function option(descripton: string, required?: boolean): (target: YCommander, attrKey: string) => void;
