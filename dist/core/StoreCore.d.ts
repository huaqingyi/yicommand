import { CommandOptions } from '../decorators';
import { TaskOptions } from '../decorators/Task';
export declare class StoreCore {
    static _this: StoreCore;
    static register(): StoreCore;
    private tasksOpt;
    constructor();
    command(constructor: Function, context?: CommandOptions): Promise<void[]>;
    tasks(method: string, context?: TaskOptions): void;
}
