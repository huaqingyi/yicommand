import { CoreClass } from '../core';
import { YCommander } from './command';

export function Action(
    target: YCommander, attrKey: string, descriptor: PropertyDescriptor
): TypedPropertyDescriptor<any>;
export function Action(description: string): (
    target: YCommander, attrKey: string, descriptor: PropertyDescriptor
) => TypedPropertyDescriptor<any>;
export function Action(props: any, attrKey?: string, descriptor?: PropertyDescriptor) {
    if (props._root === YCommander && attrKey && descriptor) {
        if (!props.actions) { props.actions = []; }
        const action = descriptor.value;
        props.actions.push({ action, description: `pleace execute ${attrKey} ...`, name: attrKey });
        return props;
    }
    return function warpper<Y extends CoreClass<YCommander>>(
        target: Y & any, key: string, desc: PropertyDescriptor
    ) {
        if (!target.actions) { target.actions = []; }
        const action = desc.value;
        target.actions.push({ action, description: props, name: key });
        return target;
    };
}

export function Children(
    target: YCommander, attrKey: string, descriptor: PropertyDescriptor
): TypedPropertyDescriptor<any>;
export function Children(description: string): (
    target: YCommander, attrKey: string, descriptor: PropertyDescriptor
) => TypedPropertyDescriptor<any>;
export function Children(props: any, attrKey?: string, descriptor?: PropertyDescriptor) {
    if (props._root === YCommander && attrKey && descriptor) {
        if (!props.actions) { props.actions = []; }
        const action = descriptor.value;
        props.actions.push({
            action, children: true, description: `pleace execute children ${attrKey} ...`,
            name: attrKey,
        });
        return props;
    }
    return function warpper<Y extends CoreClass<YCommander>>(
        target: Y & any, key: string, desc: PropertyDescriptor
    ) {
        if (!target.actions) { target.actions = []; }
        const action = desc.value;
        target.actions.push({ action, children: true, description: props, name: key });
        return target;
    };
}
