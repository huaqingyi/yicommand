import { StoreCore } from './../core/StoreCore';
export interface TaskOptions {
    option?: string[] | string,
    explain?: string,
    error?: (e: any) => any
}

export function Task(config?: TaskOptions) {
    return function (constructor: any, key: string) {
        StoreCore.register().tasks(key, config);
    }
}