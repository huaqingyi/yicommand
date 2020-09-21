"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("./command");
function option(props, attrKey) {
    if (props._root === command_1.YCommander && attrKey && typeof (attrKey) === 'string') {
        if (!props.options) {
            props.options = {};
        }
        props.options[attrKey] = { descripton: "pleace input " + attrKey, required: false };
        return props;
    }
    return function warpper(target, key) {
        if (!target.options) {
            target.options = {};
        }
        target.options[key] = { descripton: props, required: attrKey || false };
        return target;
    };
}
exports.option = option;

//# sourceMappingURL=../sourcemaps/decorators/option.js.map
