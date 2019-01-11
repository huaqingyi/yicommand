import { StoreCore } from './../core/StoreCore';
import _ from 'lodash'

export interface CommandOptions {
    context?: string;
    color?: string;
    version: string;
}

export function Command(config?: CommandOptions) {
    return function (constructor: Function, key?: string) {
        StoreCore.register().command(constructor, config);
    }
}