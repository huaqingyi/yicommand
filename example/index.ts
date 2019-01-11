import { Command, Task } from '../src';

@Command({
    context: 'test server',
    version: '1.0.0'
})
export class TestCommand {

    @Task({
        option: ['file'],
        explain: 'show test import',
        error: e => console.log(e)
    })
    public import(option: string) {
        console.log(option);
    }
}