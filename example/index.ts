import { Command, Task, Execute } from '../src';

@Command({
    context: 'test server',
    version: '1.0.0'
})
export class TestCommand {

    private name:string;

    constructor(){
        this.name = '111';
    }
    
    @Execute('conn [file]', '链接文件资源 conn 文件地址')
    public conn(){
        console.log(this.name);
        console.log(1);
    }

    @Task({
        option: ['a','b'],
        explain: 'show test import',
        error: e => console.log(e)
    })
    public import(option: string) {
        console.log(option);
    }
}