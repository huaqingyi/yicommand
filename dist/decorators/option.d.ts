import { YCommander } from './commander';
export declare function option(target: YCommander, attrKey: string): void;
export declare function option(description: string, required?: boolean): (target: YCommander, attrKey: string) => void;
