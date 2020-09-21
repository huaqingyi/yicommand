"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("./command");
function Action(props, attrKey, descriptor) {
    if (props._root === command_1.YCommander && attrKey && descriptor) {
        if (!props.actions) {
            props.actions = [];
        }
        var action = descriptor.value;
        props.actions.push({ action: action, description: "pleace execute " + attrKey + " ...", name: attrKey });
        return props;
    }
    return function warpper(target, key, desc) {
        if (!target.actions) {
            target.actions = [];
        }
        var action = desc.value;
        target.actions.push({ action: action, description: props, name: key });
        return target;
    };
}
exports.Action = Action;
function Children(props, attrKey, descriptor) {
    if (props._root === command_1.YCommander && attrKey && descriptor) {
        if (!props.actions) {
            props.actions = [];
        }
        var action = descriptor.value;
        props.actions.push({
            action: action, children: true, description: "pleace execute children " + attrKey + " ...",
            name: attrKey,
        });
        return props;
    }
    return function warpper(target, key, desc) {
        if (!target.actions) {
            target.actions = [];
        }
        var action = desc.value;
        target.actions.push({ action: action, children: true, description: props, name: key });
        return target;
    };
}
exports.Children = Children;

//# sourceMappingURL=../sourcemaps/decorators/action.js.map
