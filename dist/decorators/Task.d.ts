export interface TaskOptions {
    option?: string[] | string;
    explain?: string;
    error?: (e: any) => any;
}
export declare function Task(config?: TaskOptions): (constructor: any, key: string) => void;
