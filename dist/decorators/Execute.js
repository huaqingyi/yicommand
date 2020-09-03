"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
function Execute(config, description) {
    return function (constructor, key) {
        core_1.StoreCore.register().execs(key, config, description);
    };
}
exports.Execute = Execute;

//# sourceMappingURL=../sourcemaps/decorators/Execute.js.map
