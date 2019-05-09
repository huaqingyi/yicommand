import { StoreCore } from "../core";

export function Execute(config: string) {
    return function (constructor: any, key: string) {
        StoreCore.register().execs(key, config);
    }
}