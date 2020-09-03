import { CommandOptions } from '../decorators';
import { TaskOptions } from '../decorators/Task';
export declare class StoreCore {
    static _this: StoreCore;
    static register(): StoreCore;
    private tasksOpt;
    private execsOpt;
    private argsOpt;
    constructor();
    command(constructor: any, context?: CommandOptions): Promise<void[]>;
    execs(method: string, context: string, description?: string): void;
    tasks(method: string, context?: TaskOptions): void;
    args(methods: string, context: string): void;
}
