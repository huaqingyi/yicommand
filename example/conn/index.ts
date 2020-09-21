import { Commander, option, YCommander, Action } from '../../src';
import { Application } from '../application';

@Commander
export class ConnCommander extends YCommander<Application> {

    @option
    public ops!: string[];

    @option
    public names!: string;

    @Action
    public test() {
        console.log(this.ctx.files, this.ctx.des);
        console.log(this.ops, this.names);
    }
}
