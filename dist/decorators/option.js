"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("./commander");
function option(props, attrKey) {
    if (props._root === commander_1.YCommander && attrKey && typeof (attrKey) === 'string') {
        if (!props.options) {
            props.options = {};
        }
        props.options[attrKey] = { description: "pleace input " + attrKey, required: false };
        return props;
    }
    return function warpper(target, key) {
        if (!target.options) {
            target.options = {};
        }
        target.options[key] = { description: props, required: attrKey || false };
        return target;
    };
}
exports.option = option;

//# sourceMappingURL=../sourcemaps/decorators/option.js.map
