import { Command, Task, Execute } from '../src';

@Command({
    context: 'test server',
    version: '1.0.0'
})
export class TestCommand {
    
    @Execute('conn [file]')
    public conn(){
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