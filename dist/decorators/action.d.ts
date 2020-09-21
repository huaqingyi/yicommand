import { YCommander } from './commander';
export declare function Action(target: YCommander, attrKey: string, descriptor: PropertyDescriptor): TypedPropertyDescriptor<any>;
export declare function Action(description: string): (target: YCommander, attrKey: string, descriptor: PropertyDescriptor) => TypedPropertyDescriptor<any>;
export declare function Children(target: YCommander, attrKey: string, descriptor: PropertyDescriptor): TypedPropertyDescriptor<any>;
export declare function Children(description: string): (target: YCommander, attrKey: string, descriptor: PropertyDescriptor) => TypedPropertyDescriptor<any>;
