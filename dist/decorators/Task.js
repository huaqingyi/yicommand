"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreCore_1 = require("./../core/StoreCore");
function Task(config) {
    return function (constructor, key) {
        StoreCore_1.StoreCore.register().tasks(key, config);
    };
}
exports.Task = Task;

//# sourceMappingURL=../sourcemaps/decorators/Task.js.map
