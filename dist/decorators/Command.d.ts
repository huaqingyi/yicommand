export interface CommandOptions {
    context?: string;
    color?: string;
    version: string;
}
export declare function Command(config?: CommandOptions): (constructor: Function, key?: string | undefined) => void;
