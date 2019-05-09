import { StoreCore } from './../core/StoreCore';

export interface CommandOptions {
    context?: string;
    color?: string;
    version: string;
}

export function Command(config?: CommandOptions) {
    return function (constructor: any, key?: string) {
        StoreCore.register().command(constructor, config);
    }
}