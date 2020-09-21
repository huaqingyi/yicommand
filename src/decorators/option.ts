import { CoreClass } from '../core';
import { YCommander } from './commander';

export function option(target: YCommander, attrKey: string): void;
export function option(description: string, required?: boolean): (target: YCommander, attrKey: string) => void;
export function option(props: any, attrKey?: string | boolean) {
    if (props._root === YCommander && attrKey && typeof (attrKey) === 'string') {
        if (!props.options) { props.options = {}; }
        props.options[attrKey] = { description: `pleace input ${attrKey}`, required: false };
        return props;
    }
    return function warpper<Y extends CoreClass<YCommander>>(target: Y & any, key: string) {
        if (!target.options) { target.options = {}; }
        target.options[key] = { description: props, required: attrKey || false };
        return target;
    };
}
