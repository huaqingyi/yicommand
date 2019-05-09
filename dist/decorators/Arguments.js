"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
function Arguments(config) {
    return function (constructor, key) {
        core_1.StoreCore.register().args(key, config);
    };
}
exports.Arguments = Arguments;

//# sourceMappingURL=../sourcemaps/decorators/Arguments.js.map
