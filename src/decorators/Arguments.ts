import { StoreCore } from "../core";

export function Arguments(config: string) {
    return function (constructor: any, key: string) {
        StoreCore.register().args(key, config);
    }
}