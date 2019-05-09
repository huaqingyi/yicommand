"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
function Execute(config) {
    return function (constructor, key) {
        core_1.StoreCore.register().execs(key, config);
    };
}
exports.Execute = Execute;

//# sourceMappingURL=../sourcemaps/decorators/Execute.js.map
