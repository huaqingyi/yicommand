import { CommandOptions } from '../decorators';
import { TaskOptions } from '../decorators/Task';
export declare class StoreCore {
    static _this: StoreCore;
    static register(): StoreCore;
    private tasksOpt;
    private execsOpt;
    constructor();
    command(constructor: Function, context?: CommandOptions): Promise<void[]>;
    execs(method: string, context: string): void;
    tasks(method: string, context?: TaskOptions): void;
}
