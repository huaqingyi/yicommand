"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreCore_1 = require("./../core/StoreCore");
function Command(config) {
    return function (constructor, key) {
        StoreCore_1.StoreCore.register().command(constructor, config);
    };
}
exports.Command = Command;

//# sourceMappingURL=../sourcemaps/decorators/Command.js.map
