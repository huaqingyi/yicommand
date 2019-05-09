import { StoreCore } from "../core";

export function Execute(config: string) {
    return function (constructor: Function, key: string) {
        StoreCore.register().execs(key, config);
    }
}